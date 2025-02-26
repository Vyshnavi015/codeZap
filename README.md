# CodeZap
An AI-powered VS Code plugin for automated code, tests, debugging, and CI/CD.

## Setup
1. Install Node.js (v16+): [nodejs.org](https://nodejs.org)
2. Clone: `git clone https://github.com/Vyshnavi015/codezap.git`
3. Navigate: `cd src`
4. Install: `npm install`
5. Get Gemini API key: [ai.google.dev](https://ai.google.dev)
6. Update `extension.js` with key
7. Package: `npx vsce package`

## Run
- Install `.vsix` in VS Code (Extensions → Install from VSIX)
- Command: `CodeZap: Generate` (e.g., “write a Python sum function”)
- See code, tests, debug hints, and CI/CD via GitHub Actions

## Notes
- Uses Google Gemini API, VS Code API, GitHub Actions
- No data stored—secure HTTPS calls only
- Python-only prompts for simplicity
- See /docs/references.md for appendices