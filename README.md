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

- ✅ **Discard Tabs** - Free memory by discarding inactive tabs
- ✅ **Auto Discard** - Automatic discarding based on inactivity
- ✅ **Pinned Tabs** - Keep pinned tabs protected
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

- `discard(tabId)` - Discard specific tab
- `discardAll()` - Discard all discardable
- `start()` - Start auto discard

## Browser Support

- Chrome 90+

## Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/discard-improvement`
3. **Make** your changes
4. **Test** your changes: `npm test`
5. **Commit** your changes: `git commit -m 'Add new feature'`
6. **Push** to the branch: `git push origin feature/discard-improvement`
7. **Submit** a Pull Request

### Development Setup

```bash
# Clone the repository
git clone https://github.com/theluckystrike/chrome-tab-discard.git
cd chrome-tab-discard

# Install dependencies
npm install

# Run tests
npm test

# Build
npm run build
```

## Built by Zovo

Part of the [Zovo](https://zovo.one) developer tools family — privacy-first Chrome extensions built by developers, for developers.

## See Also

### Related Zovo Repositories

- [zovo-extension-template](https://github.com/theluckystrike/zovo-extension-template) - Boilerplate for building privacy-first Chrome extensions
- [zovo-types-webext](https://github.com/theluckystrike/zovo-types-webext) - Comprehensive TypeScript type definitions for browser extensions
- [chrome-tab-search](https://github.com/theluckystrike/chrome-tab-search) - Search across tabs

### Zovo Chrome Extensions

- [Zovo Tab Manager](https://chrome.google.com/webstore/detail/zovo-tab-manager) - Manage tabs efficiently
- [Zovo Focus](https://chrome.google.com/webstore/detail/zovo-focus) - Block distractions

Visit [zovo.one](https://zovo.one) for more information.

## License

MIT - [Zovo](https://zovo.one)

---

Built by [Zovo](https://zovo.one)
