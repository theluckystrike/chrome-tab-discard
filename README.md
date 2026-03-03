# chrome-tab-discard

Discard inactive tabs to save memory in Chrome extensions.

## Overview

chrome-tab-discard provides utilities to automatically discard unused tabs to free up memory while preserving tab state.

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

## License

MIT
