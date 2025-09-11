import {
  encodeAbiParameters,
  getAbiItem,
  type ContractFunctionArgs,
  type ContractFunctionName,
  type Abi,
  type Widen,
  type UnionWiden,
  type AbiItemName,
  type AbiItemArgs,
  type Hex,
} from "viem";
import { LicredityActionAbi } from "../abis/LicredityAction";
import { BaseActions } from "./BaseActions";

export type LicredityActionParameters<
  abi extends Abi = typeof LicredityActionAbi,
  functionName extends ContractFunctionName<
    abi,
    "pure" | "view"
  > = ContractFunctionName<abi, "pure" | "view">,
  args extends ContractFunctionArgs<
    abi,
    "pure" | "view",
    functionName
  > = ContractFunctionArgs<abi, "pure" | "view", functionName>,
  allFunctionNames = ContractFunctionName<abi, "pure" | "view">,
  allArgs = ContractFunctionArgs<abi, "pure" | "view", functionName>,
> = {
  name:
    | allFunctionNames // show all options
    | (functionName extends allFunctionNames ? functionName : never); // infer value
  args?: UnionWiden<args> | allArgs | undefined;
} & (readonly [] extends allArgs ? {} : { args: Widen<args> });

const LicredityActionType = {
  depositFungible: 0x00,
  depsoitNonFungible: 0x01,
  withdrawFungible: 0x02,
  withdrawNonFungible: 0x03,
  increaseDebtAmount: 0x04,
  increaseDebtShare: 0x05,
  decreaseDebtAmount: 0x06,
  decreaseDebtShare: 0x07,
  size: 0x08,
  exchange: 0x09,
  switch: 0x0a,
  uniswapV4PositionManagerCall: 0x0b,
  uniswapV4PoolManagerCall: 0x0c,
  dynCall: 0x11,
} as const;

export class LicredityActionsBuilder<
  const abi extends Abi = typeof LicredityActionAbi,
  functionName extends ContractFunctionName<
    abi,
    "pure" | "view"
  > = ContractFunctionName<abi, "pure" | "view">,
  const args extends ContractFunctionArgs<
    abi,
    "pure" | "view",
    functionName
  > = ContractFunctionArgs<abi, "pure" | "view", functionName>,
> {
  private items: LicredityActionParameters<abi, functionName, args>[] = [];

  constructor(items: LicredityActionParameters<abi, functionName, args>[]) {
    this.items = items;
  }

  static fromArray<
    const abi extends Abi = typeof LicredityActionAbi,
    functionName extends ContractFunctionName<
      abi,
      "pure" | "view"
    > = ContractFunctionName<abi, "pure" | "view">,
    const args extends ContractFunctionArgs<
      abi,
      "pure" | "view",
      functionName
    > = ContractFunctionArgs<abi, "pure" | "view", functionName>,
  >(items: LicredityActionParameters<abi, functionName, args>[]) {
    return new LicredityActionsBuilder(items);
  }

  addAction(config: LicredityActionParameters<abi, functionName, args>) {
    this.items.push(config);
  }

  encode() {
    const actions: Array<number> = [];
    const params: Array<Hex> = [];

    this.items.map((item) => {
      const abiItem = getAbiItem({
        abi: LicredityActionAbi,
        name: item.name as AbiItemName<typeof LicredityActionAbi>,
        args: item.args as AbiItemArgs<typeof LicredityActionAbi>,
      });
      const data = encodeAbiParameters(abiItem.inputs, item.args as any);

      params.push(data);
      actions.push(
        LicredityActionType[item.name as keyof typeof LicredityActionType],
      );
    });

    return new BaseActions({
      actions: Uint8Array.from(actions),
      params,
    });
  }
}
