const UniswapV4PositionActionType = {
  increaseLiquidity: 0x00,
  decreaseLiquidity: 0x01,
  mintPosition: 0x02,
  burnPosition: 0x03,
  increaseLiquidityFromDeltas: 0x04,
  mintPositionFromDeltas: 0x05,

  donate: 0x0a,
  settle: 0x0b,
  settlePair: 0x0d,

  take: 0x0e,
  takePortion: 0x10,
  takePair: 0x11,

  closeCurrency: 0x12,
  clearOrTake: 0x13,
  sweep: 0x14,
  wrap: 0x15,
  unwrap: 0x16,
} as const;
