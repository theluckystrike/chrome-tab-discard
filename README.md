# chrome-tab-discard

[![npm version](https://img.shields.io/npm/v/chrome-tab-discard)](https://npmjs.com/package/chrome-tab-discard)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![Chrome Web Extension](https://img.shields.io/badge/Chrome-Web%20Extension-orange.svg)](https://developer.chrome.com/docs/extensions/)
[![CI Status](https://github.com/theluckystrike/chrome-tab-discard/actions/workflows/ci.yml/badge.svg)](https://github.com/theluckystrike/chrome-tab-discard/actions)
[![Discord](https://img.shields.io/badge/Discord-Zovo-blueviolet.svg?logo=discord)](https://discord.gg/zovo)
[![Website](https://img.shields.io/badge/Website-zovo.one-blue)](https://zovo.one)
[![GitHub Stars](https://img.shields.io/github/stars/theluckystrike/chrome-tab-discard?style=social)](https://github.com/theluckystrike/chrome-tab-discard)

> Discard inactive tabs to save memory in Chrome extensions.

**chrome-tab-discard** provides utilities to automatically discard unused tabs to free up memory while preserving tab state. Part of the Zovo Chrome extension utilities.

Part of the [Zovo](https://zovo.one) developer tools family.

## Overview

chrome-tab-discard provides utilities to automatically discard unused tabs to free up memory while preserving tab state.

## Features

- ✅ **Single Tab Discard** - Discard specific tabs
- ✅ **Auto Discard** - Automatically discard inactive tabs
- ✅ **Memory Management** - Free up RAM by discarding unused tabs
- ✅ **Pinned Tab Protection** - Keep pinned tabs active
- ✅ **TypeScript Support** - Full type definitions included

## Installation

```bash
npm install chrome-tab-discard
```

## Usage

### Discard Tab

```javascript
import { TabDiscard } from 'chrome-tab-discard';

await TabDiscard.discard(tabId);
```

### Auto Discard

```javascript
const discard = new TabDiscard({
  threshold: 10000, // 10 min inactivity
  keepPinned: true,
});

discard.start();
```

## API

### Methods

| Method | Description |
|--------|-------------|
| `TabDiscard.discard(tabId)` | Discard specific tab |
| `TabDiscard.discardAll()` | Discard all discardable tabs |
| `discard.start()` | Start auto discard |
| `discard.stop()` | Stop auto discard |

### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| threshold | number | 60000 | Inactivity time in ms |
| keepPinned | boolean | true | Don't discard pinned tabs |
| keepActive | boolean | true | Don't discard active tab |

## Browser Support

- Chrome 90+

## Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/discard-feature`
3. **Make** your changes
4. **Test** your changes: `npm test`
5. **Commit** your changes: `git commit -m 'Add new feature'`
6. **Push** to the branch: `git push origin feature/discard-feature`
7. **Submit** a Pull Request

## Built by Zovo

Part of the [Zovo](https://zovo.one) developer tools family — privacy-first Chrome extensions built by developers, for developers.

## See Also

### Related Zovo Repositories

- [webext-tabs-overview](https://github.com/theluckystrike/webext-tabs-overview) - Tab dashboard
- [chrome-tab-search](https://github.com/theluckystrike/chrome-tab-search) - Tab search
- [chrome-tab-sort](https://github.com/theluckystrike/chrome-tab-sort) - Tab sorting
- [chrome-tab-groups-api](https://github.com/theluckystrike/chrome-tab-groups-api) - Tab groups

### Zovo Chrome Extensions

- [Zovo Tab Manager](https://chrome.google.com/webstore/detail/zovo-tab-manager) - Manage tabs efficiently
- [Zovo Focus](https://chrome.google.com/webstore/detail/zovo-focus) - Block distractions

Visit [zovo.one](https://zovo.one) for more information.

## License

MIT — [Zovo](https://zovo.one)

---

*Built by developers, for developers. No compromises on privacy.*
