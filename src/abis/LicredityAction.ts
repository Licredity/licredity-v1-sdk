export const LicredityActionAbi = [
  {
    name: "depsoitFungible",
    type: "function",
    stateMutability: "pure",
    inputs: [
      { name: "payerIsUser", type: "bool" },
      { name: "token", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    outputs: [],
  },
  {
    name: "depsoitNonFungible",
    type: "function",
    stateMutability: "pure",
    inputs: [
      { name: "payerIsUser", type: "bool" },
      { name: "token", type: "address" },
      { name: "tokenId", type: "uint256" },
    ],
    outputs: [],
  },
  {
    name: "withdrawFungible",
    type: "function",
    stateMutability: "pure",
    inputs: [
      { name: "recipient", type: "address" },
      { name: "token", type: "address" },
      { name: "tokenId", type: "uint256" },
    ],
    outputs: [],
  },
  {
    name: "withdrawNonFungible",
    type: "function",
    stateMutability: "pure",
    inputs: [
      { name: "recipient", type: "address" },
      { name: "token", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    outputs: [],
  },
  {
    name: "increaseDebtAmount",
    type: "function",
    stateMutability: "pure",
    inputs: [
      { name: "recipient", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    outputs: [],
  },
  {
    name: "increaseDebtShare",
    type: "function",
    stateMutability: "pure",
    inputs: [
      { name: "recipient", type: "address" },
      { name: "shares", type: "uint256" },
    ],
    outputs: [],
  },
  {
    name: "decreaseDebtAmount",
    type: "function",
    stateMutability: "pure",
    inputs: [
      { name: "payerIsUser", type: "bool" },
      { name: "amount", type: "uint256" },
      { name: "useBalance", type: "bool" },
    ],
    outputs: [],
  },
  {
    name: "decreaseDebtShare",
    type: "function",
    stateMutability: "pure",
    inputs: [
      { name: "payerIsUser", type: "bool" },
      { name: "shares", type: "uint256" },
      { name: "useBalance", type: "bool" },
    ],
    outputs: [],
  },
  {
    name: "exchange",
    type: "function",
    stateMutability: "pure",
    inputs: [
      { name: "payerIsUser", type: "bool" },
      { name: "recipient", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    outputs: [],
  },
  {
    name: "switch",
    type: "function",
    stateMutability: "pure",
    inputs: [{ name: "tokenId", type: "uint256" }],
    outputs: [],
  },
  {
    name: "uniswapV4PositionManagerCall",
    type: "function",
    stateMutability: "pure",
    inputs: [
      { name: "value", type: "uint256" },
      { name: "params", type: "bytes" },
    ],
    outputs: [],
  },
  {
    name: "uniswapV4PoolManagerCall",
    type: "function",
    stateMutability: "pure",
    inputs: [{ name: "params", type: "bytes" }],
    outputs: [],
  },
  {
    name: "dynCall",
    type: "function",
    stateMutability: "pure",
    inputs: [
      { name: "target", type: "address" },
      { name: "value", type: "uint256" },
      { name: "data", type: "bytes" },
    ],
    outputs: [],
  },
] as const;

// export type LicredityAction = ParseAbiParameters<
//   [
//     "DepositFungible depsoitFungible",
//     "struct DepositFungible { bool payerIsUser; address token; uint256 amount; }",
//   ]
// >;
