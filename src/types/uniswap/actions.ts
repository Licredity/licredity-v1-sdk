import type { Address, Hex } from "viem";

/**
 * Uniswap V4 Action Types
 * Based on UniswapV4Actions.sol from Licredity v1 Periphery test utilities
 */
export const UniswapV4ActionType = {
  // Liquidity actions
  INCREASE_LIQUIDITY: 0x00,
  DECREASE_LIQUIDITY: 0x01,
  MINT_POSITION: 0x02,
  BURN_POSITION: 0x03,
  INCREASE_LIQUIDITY_FROM_DELTAS: 0x04,
  MINT_POSITION_FROM_DELTAS: 0x05,

  // Swapping actions
  SWAP_EXACT_IN_SINGLE: 0x06,
  SWAP_EXACT_IN: 0x07,
  SWAP_EXACT_OUT_SINGLE: 0x08,
  SWAP_EXACT_OUT: 0x09,

  // Donate action (not supported in position manager or router)
  DONATE: 0x0a,

  // Closing deltas on the pool manager
  // Settling
  SETTLE: 0x0b,
  SETTLE_ALL: 0x0c,
  SETTLE_PAIR: 0x0d,

  // Taking
  TAKE: 0x0e,
  TAKE_ALL: 0x0f,
  TAKE_PORTION: 0x10,
  TAKE_PAIR: 0x11,

  // Currency management
  CLOSE_CURRENCY: 0x12,
  CLEAR_OR_TAKE: 0x13,
  SWEEP: 0x14,

  // Wrapping/Unwrapping
  WRAP: 0x15,
  UNWRAP: 0x16,

  // Minting/burning 6909s to close deltas (not supported in position manager or router)
  MINT_6909: 0x17,
  BURN_6909: 0x18,
} as const;

export type UniswapV4ActionTypeValue =
  (typeof UniswapV4ActionType)[keyof typeof UniswapV4ActionType];

/**
 * Action Constants
 * Common constants used in Uniswap V4 actions
 */
export const ActionConstants = {
  /** Used to signal that an action should use the input value of the open delta */
  OPEN_DELTA: 0n,
  /** Used to signal that an action should use the contract's entire balance */
  CONTRACT_BALANCE:
    0x8000000000000000000000000000000000000000000000000000000000000000n,
  /** Used to signal that the recipient should be the msgSender */
  MSG_SENDER: "0x0000000000000000000000000000000000000001" as Address,
  /** Used to signal that the recipient should be address(this) */
  ADDRESS_THIS: "0x0000000000000000000000000000000000000002" as Address,
} as const;

/**
 * Core Uniswap V4 Types
 */

// Currency type (from Uniswap V4 Core)
export type UniswapCurrency = Address;

// Native ETH constant for Uniswap
export const UNISWAP_NATIVE_CURRENCY: UniswapCurrency =
  "0x0000000000000000000000000000000000000000";
