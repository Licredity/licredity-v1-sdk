import {
  type ContractFunctionArgs,
  type ContractFunctionName,
  type Abi,
  type Widen,
  type UnionWiden,
  type AbiItemName,
  type AbiItemArgs,
  type Hex,
  getAbiItem,
  encodeAbiParameters,
} from "viem";
import { UniswapV4PositionManagerAbi } from "../abis/UniswapV4PositionManager";
import { BaseActions } from "./BaseActions";

const UniswapV4PositionActionType = {
  increaseLiquidity: 0x00,
  decreaseLiquidity: 0x01,
  mintPosition: 0x02,
  burnPosition: 0x03,
  increaseLiquidityFromDeltas: 0x04,
  mintPositionFromDeltas: 0x05,

  settle: 0x0b,
  settlePair: 0x0d,

  take: 0x0e,
  takePair: 0x11,

  closeCurrency: 0x12,
  clearOrTake: 0x13,
  sweep: 0x14,
  wrap: 0x15,
  unwrap: 0x16,
} as const;

export type UniswapV4PositionManagerActionParameters<
  abi extends Abi = typeof UniswapV4PositionManagerAbi,
  functionName extends ContractFunctionName<
    abi,
    "pure" | "nonpayable"
  > = ContractFunctionName<abi, "pure" | "nonpayable">,
  args extends ContractFunctionArgs<
    abi,
    "pure" | "nonpayable",
    functionName
  > = ContractFunctionArgs<abi, "pure" | "nonpayable", functionName>,
  allFunctionNames = ContractFunctionName<abi, "pure" | "nonpayable">,
  allArgs = ContractFunctionArgs<abi, "pure" | "nonpayable", functionName>,
> = {
  name:
    | allFunctionNames // show all options
    | (functionName extends allFunctionNames ? functionName : never); // infer value
  args?: UnionWiden<args> | allArgs | undefined;
} & (readonly [] extends allArgs ? {} : { args: Widen<args> });

export class UniswapV4PositionManagerActionsBuilder<
  const abi extends Abi = typeof UniswapV4PositionManagerAbi,
  functionName extends ContractFunctionName<
    abi,
    "pure" | "nonpayable"
  > = ContractFunctionName<abi, "pure" | "nonpayable">,
  const args extends ContractFunctionArgs<
    abi,
    "pure" | "nonpayable",
    functionName
  > = ContractFunctionArgs<abi, "pure" | "nonpayable", functionName>,
> {
  private items: UniswapV4PositionManagerActionParameters<
    abi,
    functionName,
    args
  >[] = [];

  constructor(
    items: UniswapV4PositionManagerActionParameters<abi, functionName, args>[],
  ) {
    this.items = items;
  }

  static fromArray<
    const abi extends Abi = typeof UniswapV4PositionManagerAbi,
    functionName extends ContractFunctionName<
      abi,
      "pure" | "nonpayable"
    > = ContractFunctionName<abi, "pure" | "nonpayable">,
    const args extends ContractFunctionArgs<
      abi,
      "pure" | "nonpayable",
      functionName
    > = ContractFunctionArgs<abi, "pure" | "nonpayable", functionName>,
  >(
    items: UniswapV4PositionManagerActionParameters<abi, functionName, args>[],
  ) {
    return new UniswapV4PositionManagerActionsBuilder(items);
  }

  addAction(
    config: UniswapV4PositionManagerActionParameters<abi, functionName, args>,
  ) {
    this.items.push(config);
  }

  encode() {
    const actions: Array<number> = [];
    const params: Array<Hex> = [];

    this.items.map((item) => {
      const abiItem = getAbiItem({
        abi: UniswapV4PositionManagerAbi,
        name: item.name as AbiItemName<typeof UniswapV4PositionManagerAbi>,
        args: item.args as AbiItemArgs<typeof UniswapV4PositionManagerAbi>,
      });
      const data = encodeAbiParameters(abiItem.inputs, item.args as any);

      params.push(data);
      actions.push(
        UniswapV4PositionActionType[
          item.name as keyof typeof UniswapV4PositionActionType
        ],
      );
    });

    return new BaseActions({
      actions: Uint8Array.from(actions),
      params,
    });
  }
}
