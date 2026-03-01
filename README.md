# chrome-tab-discard — Tab Memory Management for Extensions
> **Built by [Zovo](https://zovo.one)** | `npm i chrome-tab-discard`

Discard inactive tabs, auto-discard by age, whitelisting, and memory stats.

```typescript
import { TabDiscard } from 'chrome-tab-discard';
await TabDiscard.discardInactive();
await TabDiscard.discardOlderThan(60);
const stats = await TabDiscard.getTabStats();
```
MIT License
