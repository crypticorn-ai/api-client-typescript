![Crypticorn Logo](https://www.crypticorn.com/wp-content/uploads/2024/05/Logo-horizontal_blue.svg)

## What is Crypticorn?

Crypticorn is at the forefront of cutting-edge crypto trading with Machine Learning.

Use this API Client to access valuable data sources, contribute to the Hive AI - a community driven AI Meta Model for predicting the
crypto market - and programmatically interact with the entire Crypticorn ecosystem.

## Installation

You need Node.js 18+ installed to be able to use this library.

You can install the latest stable version from npm:
```bash
npm install @crypticorn-ai/api-client
```

If you want the latest beta version, run:
```bash
npm install @crypticorn-ai/api-client@beta
```

## Structure

Our API is available as a TypeScript/JavaScript SDK with full TypeScript support. The main entry point is:

- `AsyncClient` - Main client for all API operations

```typescript
import { AsyncClient } from '@crypticorn-ai/api-client'
```

The client serves as the central interface for API operations and provides access to multiple API wrappers corresponding to our micro services.

You can either explore each API by clicking through the library or checkout the [API Documentation](https://api.crypticorn.dev/docs).

## Versioning

The SDK major version tracks the highest supported API version. A new API major bump always triggers a new major release of this package. Minor and patch versions only add non-breaking changes. We follow [Semantic Versioning](https://semver.org/).

| SDK Version | Auth | Trade | Klines | Metrics | Hive | Dex | Pay | Notification |
| ----------- | ---- | ----- | ------ | ------- | ---- | --- | --- | ------------ |
| v2.x        | v1   | v1    | v1     | v1      | v1   | v1  | v1  | v1           |
| v3.x        | v1   | v2    | -      | v1      | v1   | v1  | v1  | v1           |
| v4.x        | v1 (refactored)   | v2    | -      | v1      | v1   | v1  | v1  | v1           |


## Authentication

To get started, [create an API key in your dashboard](https://app.crypticorn.com/account/settings).

The scopes you can assign, resemble the [package structure](#structure). The first part defines if the scopes is for reading or writing a resource, the second matches the API, the third the ROUTER being used. `read` scopes gives access to GET, `write` to PUT, PATCH, POST, DELETE endpoints.

There are scopes which don't follow this structure. Those are either scopes that must be purchased (e.g. `read:predictions`), give access to endpoints existing in all APIs (e.g. `read:admin`) or provide access to an entire service (e.g. `read:sentiment`).

## Basic Usage

You can create a client instance and configure it as needed:

```typescript
import { AsyncClient } from '@crypticorn-ai/api-client'

// Create client with API key (recommended)
const client = new AsyncClient({
  apiKey: 'your-api-key',
})

// Or create with JWT
const client = new AsyncClient({
  jwt: 'your-jwt-token',
})

// Make API calls
const balances = await client.pay.getBalances()
const trades = await client.trade.getOrders()
```
## Service Configuration

You can configure individual services for testing or different environments:

```typescript
client.configure('trade', {
  host: 'https://trade-api.example.com',
  jwt: 'different-jwt-token'
})
```
