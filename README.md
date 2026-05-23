# AnyMini

AnyMini is a lightweight browser tool to minify text or code instantly.

It features a modern responsive interface, smart minification modes, live compression stats, and export utilities.

See the demo here - [AnyMini](https://phe0nix.github.io/anymini/)

## Latest Features

- Responsive two-panel editor UI optimized for desktop and mobile
- Three minification modes:
	- Smart mode (auto-detects code vs plain text)
	- Code mode (comment and whitespace reduction)
	- Text mode (whitespace normalization)
- Live metrics:
	- Input character count
	- Output character count
	- Compression percentage saved
- One-click utilities:
	- Copy minified output to clipboard
	- Download output as a text file
	- Open raw output preview in a new window
- Keyboard shortcut support:
	- Ctrl/Cmd + Enter to run minification quickly

## How To Use

1. Paste your content into the Input panel.
2. Choose a mode (or keep Smart mode).
3. Click Minify.
4. Copy, download, or preview raw output.

## Tech Notes

- Frontend: Vanilla HTML, CSS, and modern JavaScript (no framework)
- JavaScript refactor uses event-driven DOM handling and modular utility functions
- UI includes status messaging for common actions and error states (empty input, blocked popup, clipboard fallback)

## Local Run

Open [index.html](index.html) in your browser.


