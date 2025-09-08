export const LicredityAccountAbi = [
  {
    type: "constructor",
    inputs: [
      {
        name: "_governor",
        type: "address",
        internalType: "address",
      },
      {
        name: "_uniswapV4poolManager",
        type: "address",
        internalType: "contract IPoolManager",
      },
      {
        name: "_uniswapV4PostionManager",
        type: "address",
        internalType: "address",
      },
      {
        name: "_permit2",
        type: "address",
        internalType: "contract IAllowanceTransfer",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "receive",
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "appointNextGovernor",
    inputs: [
      {
        name: "_nextGovernor",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "close",
    inputs: [
      {
        name: "market",
        type: "address",
        internalType: "contract ILicredity",
      },
      {
        name: "positionId",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "confirmNextGovernor",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "execute",
    inputs: [
      {
        name: "licredity",
        type: "address",
        internalType: "contract ILicredity",
      },
      {
        name: "inputs",
        type: "bytes",
        internalType: "bytes",
      },
      {
        name: "deadline",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "open",
    inputs: [
      {
        name: "market",
        type: "address",
        internalType: "contract ILicredity",
      },
    ],
    outputs: [
      {
        name: "positionId",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "poolManager",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "contract IPoolManager",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "positionManager",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "sweepFungible",
    inputs: [
      {
        name: "currency",
        type: "address",
        internalType: "Currency",
      },
      {
        name: "recipient",
        type: "address",
        internalType: "address",
      },
      {
        name: "amount",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "sweepNonFungible",
    inputs: [
      {
        name: "nonFungible",
        type: "bytes32",
        internalType: "NonFungible",
      },
      {
        name: "recipient",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "unlockCallback",
    inputs: [
      {
        name: "data",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "updateLicredityMarketWhitelist",
    inputs: [
      {
        name: "market",
        type: "address",
        internalType: "address",
      },
      {
        name: "isWhitelist",
        type: "bool",
        internalType: "bool",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "updateRouterWhitelist",
    inputs: [
      {
        name: "router",
        type: "address",
        internalType: "address",
      },
      {
        name: "isWhitelist",
        type: "bool",
        internalType: "bool",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "updateTokenApporve",
    inputs: [
      {
        name: "token",
        type: "address",
        internalType: "address",
      },
      {
        name: "spender",
        type: "address",
        internalType: "address",
      },
      {
        name: "amount",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "updateTokenPermit2",
    inputs: [
      {
        name: "token",
        type: "address",
        internalType: "address",
      },
      {
        name: "spender",
        type: "address",
        internalType: "address",
      },
      {
        name: "amount",
        type: "uint160",
        internalType: "uint160",
      },
      {
        name: "expiration",
        type: "uint48",
        internalType: "uint48",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "AppointNextGovernor",
    inputs: [
      {
        name: "nextGovernor",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "ConfirmNextGovernor",
    inputs: [
      {
        name: "lastGovernor",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "newGovernor",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "UpdatePoolWhitelist",
    inputs: [
      {
        name: "pool",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "isWhitelisted",
        type: "bool",
        indexed: false,
        internalType: "bool",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "UpdateRouterWhitelist",
    inputs: [
      {
        name: "router",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "isWhitelisted",
        type: "bool",
        indexed: false,
        internalType: "bool",
      },
    ],
    anonymous: false,
  },
  {
    type: "error",
    name: "ContractLocked",
    inputs: [],
  },
  {
    type: "error",
    name: "DeadlinePassed",
    inputs: [
      {
        name: "deadline",
        type: "uint256",
        internalType: "uint256",
      },
    ],
  },
  {
    type: "error",
    name: "DeltaNotNegative",
    inputs: [
      {
        name: "currency",
        type: "address",
        internalType: "Currency",
      },
    ],
  },
  {
    type: "error",
    name: "DeltaNotPositive",
    inputs: [
      {
        name: "currency",
        type: "address",
        internalType: "Currency",
      },
    ],
  },
  {
    type: "error",
    name: "InputLengthMismatch",
    inputs: [],
  },
  {
    type: "error",
    name: "NotSafeCallback",
    inputs: [],
  },
] as const;
