# Licredity v1 Periphery TypeScript SDK Construction Plan

## Overview

This document outlines the construction plan for a comprehensive TypeScript SDK for the [Licredity v1 Periphery](/Users/wangshouhao/Code/licredity-v1-periphery) contracts. The SDK will provide type-safe, user-friendly interfaces for interacting with Licredity's lending protocol, position management, and Uniswap V4 integration.

## Core Architecture

### Primary Contracts

1. **LicredityAccount** - Account-based position management
2. **PositionManager** - NFT-based position management with ERC721 functionality
3. **PositionManagerConfig** - Configuration and governance utilities

### Key Dependencies

- **Licredity Core** - Primary lending protocol logic
- **Uniswap V4** - DEX integration for swaps and liquidity
- **Permit2** - Advanced token approval system

## SDK Structure

```
src/
├── abis/
│   ├── LicredityAccountContract.ts
│   └── PositionManagerContract.ts
├── actions/
│   ├── licredity/
│   │   ├── depositFungible.ts
│   │   ├── depositNonFungible.ts
│   │   ├── withdrawFungible.ts
│   │   ├── withdrawNonFungible.ts
│   │   ├── increaseDebt.ts
│   │   ├── decreaseDebt.ts
│   │   └── seize.ts
│   ├── uniswap/
│   │   ├── swap.ts
│   │   ├── settle.ts
│   │   ├── take.ts
│   │   └── sweep.ts
│   └── position/
│       ├── mint.ts
│       ├── burn.ts
│       ├── switch.ts
│       └── dynCall.ts
├── builders/
│   ├── ActionBuilder.ts
│   ├── LicredityActionBuilder.ts
│   └── UniswapV4ActionBuilder.ts
├── encoders/
│   ├── CalldataEncoder.ts
│   └── ActionEncoder.ts
├── types/
│   └── actions.ts
├── utils/
│   ├── constants.ts
│   ├── validation.ts
│   └── formatting.ts
└── index.ts
```

## Action System Architecture

### Action Types (From Actions.sol)

```typescript
export enum ActionType {
  DEPOSIT_FUNGIBLE = 0x00,
  DEPOSIT_NON_FUNGIBLE = 0x01,
  WITHDRAW_FUNGIBLE = 0x02,
  WITHDRAW_NON_FUNGIBLE = 0x03,
  INCREASE_DEBT_AMOUNT = 0x04,
  INCREASE_DEBT_SHARE = 0x05,
  DECREASE_DEBT_AMOUNT = 0x06,
  DECREASE_DEBT_SHARE = 0x07,
  SEIZE = 0x08,
  SWITCH = 0x0a,
  UNISWAP_V4_POSITION_MANAGER_CALL = 0x0b,
  UNISWAP_V4_POOL_MANAGER_CALL = 0x0c,
  UNISWAP_V4_SWAP = 0x0d,
  UNISWAP_V4_TAKE = 0x0e,
  UNISWAP_V4_SETTLE = 0x0f,
  UNISWAP_V4_SWEEP = 0x10,
  DYN_CALL = 0x11,
}
```

### Action Builder Pattern

```typescript
class ActionBuilder {
  private actions: ActionType[] = [];
  private params: string[] = [];

  depositFungible(payerIsUser: boolean, token: string, amount: bigint): this
  withdrawFungible(recipient: string, token: string, amount: bigint): this
  increaseDebt(recipient: string, amount: bigint): this
  uniswapSwap(swapParams: SwapParams): this

  build(): { actions: Uint8Array, params: string[] }
}
```

## Parameter Encoding System

### CalldataDecoder Integration

Based on the CalldataDecoder.sol, implement TypeScript encoders for:

- **Action Parameters**
  - `encodeDeposit(payerIsUser, token, amount)`
  - `encodeWithdraw(recipient, token, amount)`
  - `encodeIncreaseDebt(recipient, amount)`
  - `encodeDecreaseDebt(payerIsUser, amount, useBalance)`

- **Uniswap Parameters**
  - `encodeCurrencyUint256AndBool(currency, amount, boolean)`
  - `encodeCurrencyAddressAndUint256(currency, address, amount)`
  - `encodeCallValueAndData(value, data)`

## Configuration & Governance

### PositionManagerConfig Integration

- **Market Whitelisting**
  - `updateLicredityMarketWhitelist(market, isWhitelist)`
  - Market validation utilities

- **Router Management**
  - `updateRouterWhitelist(router, isWhitelist)`
  - Dynamic call target validation

- **Token Approvals**
  - `updateTokenPermit2(token, spender, amount, expiration)`
  - `updateTokenApprove(token, spender, amount)`

## Error Handling & Validation

### Contract Error Integration

```typescript
export class LicredityError extends Error {
  constructor(
    public readonly errorName: string,
    public readonly errorData?: any
  ) {
    super(`Licredity Error: ${errorName}`);
  }
}

// Specific error types
export class ContractLockedError extends LicredityError {}
export class DeadlinePassedError extends LicredityError {}
export class MarketNotWhitelistedError extends LicredityError {}
export class NotApprovedError extends LicredityError {}
```

### Input Validation

- Parameter type checking
- Range validation (amounts, deadlines)
- Address format validation
- Token approval verification

## Implementation Phases

### Phase 1: Core Infrastructure
- Type definitions
- Contract clients
- Basic action encoding
- Error handling framework

### Phase 2: Core Operations
- Position management (mint/burn/execute)
- Asset operations (deposit/withdraw)
- Debt management (increase/decrease)

### Phase 3: Advanced Features
- Uniswap V4 integration
- Dynamic calls
- Liquidation system
- Batch operations

### Phase 4: Developer Experience
- Action builders
- Validation utilities
- Documentation
- Testing suite

### Phase 5: Optimization & Polish
- Gas optimization
- Performance improvements
- Advanced error handling
- Production readiness

## Testing Strategy

### Unit Tests
- Action encoding/decoding
- Parameter validation
- Error handling
- Utility functions

### Integration Tests
- Full transaction flows
- Multi-action sequences
- Error scenarios
- Gas optimization

### E2E Tests
- Mainnet fork testing
- Real market interactions
- Cross-protocol operations

## Documentation

### API Documentation
- Function signatures and parameters
- Usage examples for each operation
- Common patterns and best practices

### Guides
- Getting started guide
- Position management workflows
- Liquidation strategies
- Uniswap V4 integration patterns

## Dependencies

### Runtime Dependencies
- `viem` - Ethereum client library
- `abitype` - TypeScript ABI utilities

This SDK will provide a comprehensive, type-safe interface for interacting with the Licredity v1 Periphery contracts, enabling developers to build sophisticated DeFi applications with confidence and ease.
