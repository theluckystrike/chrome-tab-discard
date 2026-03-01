/**
 * Tab Discard — Memory management via tab discarding
 */
export class TabDiscard {
    private whitelist = new Set<string>();

    /** Discard a tab by ID */
    static async discard(tabId: number): Promise<chrome.tabs.Tab | undefined> {
        return chrome.tabs.discard(tabId);
    }

    /** Discard all inactive tabs */
    static async discardInactive(): Promise<number> {
        const tabs = await chrome.tabs.query({ active: false, discarded: false });
        let count = 0;
        for (const tab of tabs) {
            if (tab.id && !tab.pinned && !tab.audible) {
                try { await chrome.tabs.discard(tab.id); count++; } catch { }
            }
        }
        return count;
    }

    /** Discard tabs older than given minutes */
    static async discardOlderThan(minutes: number): Promise<number> {
        const tabs = await chrome.tabs.query({ active: false, discarded: false });
        const cutoff = Date.now() - (minutes * 60000);
        let count = 0;
        for (const tab of tabs) {
            if (tab.id && (tab.lastAccessed || 0) < cutoff && !tab.pinned) {
                try { await chrome.tabs.discard(tab.id); count++; } catch { }
            }
        }
        return count;
    }

    /** Get discarded tabs */
    static async getDiscarded(): Promise<chrome.tabs.Tab[]> {
        return chrome.tabs.query({ discarded: true });
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
                if (tab.id && !tab.pinned && !tab.audible && (tab.lastAccessed || 0) < cutoff) {
                    const dominated = tab.url ? !Array.from(this.whitelist).some((d) => tab.url!.includes(d)) : true;
                    if (dominated) try { await chrome.tabs.discard(tab.id); } catch { }
                }
            }
        }, intervalMinutes * 60000) as any;
    }
}
