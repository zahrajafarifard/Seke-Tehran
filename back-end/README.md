# Back-End Service

## Overview

The `back-end` project is the core service layer for Seke Tehran. It is implemented with Node.js, Express, Sequelize, and MySQL, and it supports both REST APIs and real-time price updates through Socket.IO.

This service is responsible for:

- storing and retrieving coin price data
- updating live price tables for multiple locations
- managing display configuration and permissions
- supporting both static and archive pricing records for audit and real-time use

## Key Features

- REST API routes for updating price displays and fetching current coin data
- Database model layer using Sequelize for MySQL persistence
- Real-time socket support for live updates
- Separate handling of BLV, Pelatin, and Pasag price tables
- Configuration and permission management by location
- Image generation for visual price displays using Sharp

## Image Generation

The backend generates coin price images dynamically using the Sharp library. It creates SVG overlays with coin names, buy/sell prices, and status indicators for display on price boards.

## Service Setup

The `node-service.js` file sets up the application as a Windows service using node-windows, enabling it to run as a background service named 'SekeTehran TV' for continuous operation.

## API Routes

### POST /updateTabloBLV, /updateTabloPelatin, /updateTabloPasag

Updates the selected price board table and saves historical price records. These routes accept a price payload and update both the static display table and archive history.

### POST /updateVoipByBLV, /updateVoipByPelatin, /updateVoipByPasag

Updates VoIP-specific price records and status flags for each price entry. Used to keep VoIP systems in sync with the main pricing service.

### GET /getCoinNames

Returns a list of supported coin names and types used by the system.

### POST /getCoins

Accepts a `table` parameter in the request body and returns the latest coin prices for that price table.

### GET /getUpdateAtCoin

Retrieves the latest timestamp when coin prices were updated.

### GET /getAllCoins

Returns a full snapshot of current coin prices across all available tables.

### GET /getConfig/:location

Fetches configuration and permission settings for a specific display location.

### POST /registerConfig

Creates or updates configuration settings and permission rules for a location, including site updates, display control, and VoIP sync options.

## Installation

```bash
cd back-end
npm install
```

## Run

```bash
cd back-end
npm start
```

## Deployment Notes

- Ensure MySQL is running and credentials are configured in `DB/config.js`.
- The backend uses Sequelize models to map archive and current price tables.
- Socket.IO provides the real-time update channel for display applications.

## Author

Zahra Jafarifard
