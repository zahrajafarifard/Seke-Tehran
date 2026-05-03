# Seke Tehran

A professional multi-project repository for the Seke Tehran platform, designed to support live coin pricing, desktop operations, and digital signage display.

## What this repository includes

- `back-end/` — REST API service with database models, price update workflows, configuration control, and live data synchronization.
- `desktop-app/` — Electron + React desktop application for administrators and operators to manage pricing, configuration, and status screens.
- `digital-price-board/` — React-based digital display board optimized for public price boards and signage.

## Why this is recruiter-friendly

- Full-stack architecture with separate backend, desktop client, and display frontend.
- Clear separation of concerns: API/service layer, Electron desktop experience, and digital signage presentation.
- Uses industry-standard tools and frameworks for reliability and maintainability.

## Architecture overview

- `back-end/` handles data persistence, business rules, and real-time update flows using Express, Sequelize, and Socket.IO.
- `desktop-app/` is built with React and Electron, providing a user-friendly interface for monitoring and configuring the system.
- `digital-price-board/` is a single-page React application intended for live display of market prices in public-facing environments.

## Key strengths

- Designed for real-time pricing workflows.
- Supports multiple exchange sources and display tables.
- Includes both administration and presentation layers.
- Backend is built around a modular database model and route-driven API.

## Author

- Zahra Jafarifard
- GitHub: [zahrajafarifard](https://github.com/zahrajafarifard)

## Repository Link

Hosted at: https://github.com/zahrajafarifard/Seke-Tehran
