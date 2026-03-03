/**
 * Tab Discard — Memory management via tab discarding
 */

export class TabDiscardError extends Error {
    constructor(
        message: string,
        public code: string,
        public originalError?: Error
    ) {
        super(message);
        this.name = 'TabDiscardError';
        if (originalError?.stack) {
            this.stack = originalError.stack;
        }
    }
}

export const TabDiscardErrorCode = {
    DISCARD_FAILED: 'DISCARD_FAILED',
    TAB_NOT_FOUND: 'TAB_NOT_FOUND',
    QUERY_FAILED: 'QUERY_FAILED',
} as const;

/**
 * Tab Discard — Memory management via tab discarding
 */
export class TabDiscard {
    private whitelist = new Set<string>();

    /** Discard a tab by ID */
    static async discard(tabId: number): Promise<chrome.tabs.Tab | undefined> {
        try {
            return await chrome.tabs.discard(tabId);
        } catch (error) {
            const err = error as Error;
            throw new TabDiscardError(
                `Failed to discard tab ${tabId}: ${err.message}. ` +
                `The tab may not exist, may already be discarded, or the extension may not have permission to discard tabs.`,
                TabDiscardErrorCode.DISCARD_FAILED,
                err
            );
        }
    }

    /** Discard all inactive tabs */
    static async discardInactive(): Promise<{ success: number; failed: number }> {
        const tabs = await chrome.tabs.query({ active: false, discarded: false });
        let success = 0;
        let failed = 0;
        for (const tab of tabs) {
            if (tab.id && !tab.pinned && !tab.audible) {
                try { 
                    await chrome.tabs.discard(tab.id); 
                    success++;
                } catch (error) {
                    failed++;
                    console.warn(`[TabDiscard] Failed to discard tab ${tab.id}:`, error);
                }
            }
        }
        return { success, failed };
    }

    /** Discard tabs older than given minutes */
    static async discardOlderThan(minutes: number): Promise<{ success: number; failed: number }> {
        const tabs = await chrome.tabs.query({ active: false, discarded: false });
        const cutoff = Date.now() - (minutes * 60000);
        let success = 0;
        let failed = 0;
        for (const tab of tabs) {
            if (tab.id && ((tab as any).lastAccessed || 0) < cutoff && !tab.pinned) {
                try { 
                    await chrome.tabs.discard(tab.id); 
                    success++;
                } catch (error) {
                    failed++;
                    console.warn(`[TabDiscard] Failed to discard older tab ${tab.id}:`, error);
                }
            }
        }
        return { success, failed };
    }

    /** Get discarded tabs */
    static async getDiscarded(): Promise<chrome.tabs.Tab[]> {
        try {
            return await chrome.tabs.query({ discarded: true });
        } catch (error) {
            const err = error as Error;
            throw new TabDiscardError(
                `Failed to query discarded tabs: ${err.message}. ` +
                `Check if the extension has permission to access tab information.`,
                TabDiscardErrorCode.QUERY_FAILED,
                err
            );
        }
    }

    /** Get memory stats */
    static async getTabStats(): Promise<{ total: number; active: number; discarded: number; audible: number; pinned: number }> {
        const tabs = await chrome.tabs.query({});
        return {
            total: tabs.length,
            active: tabs.filter((t) => !t.discarded).length,
            discarded: tabs.filter((t) => t.discarded).length,
            audible: tabs.filter((t) => t.audible).length,
            pinned: tabs.filter((t) => t.pinned).length,
        };
    }

    /** Add domain to whitelist (never discard) */
    addToWhitelist(domain: string): this { this.whitelist.add(domain); return this; }

    /** Auto-discard tabs on interval */
    startAutoDiscard(intervalMinutes: number = 30, maxAgeMinutes: number = 60): NodeJS.Timeout {
        return setInterval(async () => {
            const tabs = await chrome.tabs.query({ active: false, discarded: false });
            const cutoff = Date.now() - (maxAgeMinutes * 60000);
            for (const tab of tabs) {
                if (tab.id && !tab.pinned && !tab.audible && ((tab as any).lastAccessed || 0) < cutoff) {
                    const dominated = tab.url ? !Array.from(this.whitelist).some((d) => tab.url!.includes(d)) : true;
                    if (dominated) {
                        try { 
                            await chrome.tabs.discard(tab.id); 
                        } catch (error) {
                            console.warn(`[TabDiscard] Auto-discard failed for tab ${tab.id}:`, error);
                        }
                    }
                }
            }
        }, intervalMinutes * 60000) as any;
    }
}
