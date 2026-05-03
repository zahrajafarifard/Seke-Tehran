# Desktop App

## Overview

The `desktop-app` project is an Electron + React application designed for Seke Tehran operators and administrators. It provides a polished desktop experience for viewing current market prices, updating display configuration, and inspecting application status.

## Key Features

- Electron desktop shell for native-like deployment
- React UI with `react-router-dom` navigation
- Redux-based state management for consistent app state
- Tailwind CSS styling for responsive and modern UI
- Dedicated configuration and About/Settings pages

## Application Structure

- `src/components/` — user interface components including `Main`, `Menu`, `Config`, and `SettingsAboutUs`
- `src/store/` — Redux action and reducer files for state handling
- `src/App.js` — main application routes and layout
- `public/` — Electron preload and required static assets

## Routes

- `/` — Main dashboard view for live price and system status
- `/config` — configuration screen for display and update options
- `/settings-about-us` — informational page with company and version details

## Installation

```bash
cd desktop-app
npm install
```

## Run locally

```bash
cd desktop-app
npm start
```

## Packaging

This project includes Electron packaging scripts in `package.json` to build installers for macOS, Windows, and Linux.

## Notes

- The app is designed to connect with the backend service for live pricing and configuration updates.
- UI components are organized for easy extension and maintenance.

## Author

Zahra Jafarifard
