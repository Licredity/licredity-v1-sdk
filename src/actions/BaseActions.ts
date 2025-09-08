import { encodeAbiParameters, toHex, type ByteArray, type Hex } from "viem";

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
