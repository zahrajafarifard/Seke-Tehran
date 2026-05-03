# Digital Price Board

## Overview

The `digital-price-board` project is a React application built to display live coin prices in a high-visibility format. It is optimized for digital signage use and public price board deployment.

## Key Features

- Clean, full-screen market price display
- Live coin pricing updates
- Modern design with responsive layout and icons
- Shared font and image assets for branding consistency
- Ready for use as a public digital signage app

## Application Structure

- `src/components/Main.js` — main display component that renders the price board layout
- `src/assets/` — fonts, images, and icon assets used for visual styling
- `src/shared/spinner.js` — reusable loading indicator component
- `src/App.js` — root entry point that renders the display board

## Installation

```bash
cd digital-price-board
npm install
```

## Run locally

```bash
cd digital-price-board
npm start
```

## Notes

- This project is intended to consume live price data from the backend service or a connected socket source.
- The UI is designed for candidate review and public-facing presentation.
- The app uses standard React tooling for fast development and deployment.

## Author

Zahra Jafarifard
