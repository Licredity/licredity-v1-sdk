import {
  encodeAbiParameters,
  getAddress,
  toHex,
  type ByteArray,
  type Hex,
} from "viem";

export const ActionConstants = {
  OPEN_DELTA: 0n,
  CONTRACT_BALANCE:
    "0x8000000000000000000000000000000000000000000000000000000000000000",
  MSG_SENDER: "0x0000000000000000000000000000000000000001",
  ADDRESS_THIS: "0x0000000000000000000000000000000000000002",
} as const;

export class BaseActions {
  actions: Uint8Array;
  params: Array<Hex>;

  constructor(config: { actions: Uint8Array; params: Array<Hex> }) {
    if (config.actions.length !== config.params.length) {
      throw new Error("Actions length !== params length");
    }

    this.actions = config.actions;
    this.params = config.params;
  }

  toCalldata() {
    return encodeAbiParameters(
      [
        { name: "actions", type: "bytes" },
        { name: "params", type: "bytes[]" },
      ],
      [toHex(this.actions), this.params],
    );
  }
}
