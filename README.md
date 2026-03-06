# chrome-tab-discard

Tab discarding and memory management for Chrome extensions. Freeze inactive tabs, auto-discard by age, whitelist domains, and track tab statistics. Built for Manifest V3.

INSTALL

```
npm install chrome-tab-discard
```

QUICK START

```typescript
import { TabDiscard } from 'chrome-tab-discard';

// Discard a single tab by ID
await TabDiscard.discard(tabId);

// Discard all inactive tabs (skips pinned and audible)
const count = await TabDiscard.discardInactive();

// Discard tabs untouched for 45 minutes
await TabDiscard.discardOlderThan(45);
```

STATIC METHODS

TabDiscard.discard(tabId)
Discards a specific tab by its numeric ID. Returns the updated chrome.tabs.Tab object, or undefined if the tab could not be discarded.

TabDiscard.discardInactive()
Queries all non-active, non-discarded tabs and discards each one that is not pinned and not playing audio. Returns the number of tabs discarded.

TabDiscard.discardOlderThan(minutes)
Discards tabs whose lastAccessed timestamp is older than the given threshold in minutes. Pinned tabs are always skipped. Returns the number of tabs discarded.

TabDiscard.getDiscarded()
Returns an array of all currently discarded tabs.

TabDiscard.getTabStats()
Returns an object with counts across your tab population.

```typescript
const stats = await TabDiscard.getTabStats();
// { total, active, discarded, audible, pinned }
```

INSTANCE METHODS

The class can also be instantiated to manage a domain whitelist and run periodic auto-discard.

addToWhitelist(domain)
Adds a domain string to the internal whitelist. Tabs whose URL contains a whitelisted domain will never be auto-discarded. Returns `this` for chaining.

startAutoDiscard(intervalMinutes?, maxAgeMinutes?)
Starts a repeating interval that discards inactive tabs older than maxAgeMinutes (default 60). Runs every intervalMinutes (default 30). Skips pinned tabs, audible tabs, and whitelisted domains. Returns the interval handle.

```typescript
const manager = new TabDiscard();
manager
  .addToWhitelist('github.com')
  .addToWhitelist('docs.google.com');

manager.startAutoDiscard(15, 30);
// Every 15 minutes, discard tabs idle for 30+ minutes
// github.com and docs.google.com tabs are always kept
```

PERMISSIONS

Your manifest.json needs the tabs permission.

```json
{
  "permissions": ["tabs"]
}
```

BROWSER SUPPORT

Chrome 90 and above. Requires Manifest V3.

CONTRIBUTING

Fork the repo, create a branch, make your changes, and open a pull request.

```
git clone https://github.com/theluckystrike/chrome-tab-discard.git
cd chrome-tab-discard
npm install
npm run build
```

LICENSE

MIT. See LICENSE file for details.

---

Part of the Zovo family of Chrome extension tools. Visit zovo.one for more.
