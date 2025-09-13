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
  type Address,
} from "viem";
import { UniswapV4PoolManagerAbi } from "../abis/UniswapV4PoolManager";
import { ActionConstants, BaseActions } from "./BaseActions";

const UniswapV4PoolActions = {
  swap: 0x0d,
  take: 0x0e,
  settle: 0x0f,
  sweep: 0x10,
} as const;

export type PoolKey = {
  currency0: Address;
  currency1: Address;
  fee: number;
  tickSpacing: number;
  hooks: Address;
};

export type UniswapV4ActionParameters<
  abi extends Abi = typeof UniswapV4PoolManagerAbi,
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

export class UniswapV4ActionsBuilder<
  const abi extends Abi = typeof UniswapV4PoolManagerAbi,
> {
  private items: any[] = [];

  private constructor(items: any[]) {
    this.items = items;
  }

  static fromArray<
    const abi extends Abi = typeof UniswapV4PoolManagerAbi,
    functionName extends ContractFunctionName<
      abi,
      "pure" | "nonpayable"
    > = ContractFunctionName<abi, "pure" | "nonpayable">,
    const args extends ContractFunctionArgs<
      abi,
      "pure" | "nonpayable",
      functionName
    > = ContractFunctionArgs<abi, "pure" | "nonpayable", functionName>,
  >(items: UniswapV4ActionParameters<abi, functionName, args>[]) {
    return new UniswapV4ActionsBuilder(items);
  }

  addAction<
    functionName extends ContractFunctionName<
      abi,
      "pure" | "nonpayable"
    > = ContractFunctionName<abi, "pure" | "nonpayable">,
    const args extends ContractFunctionArgs<
      abi,
      "pure" | "nonpayable",
      functionName
    > = ContractFunctionArgs<abi, "pure" | "nonpayable", functionName>,
  >(config: UniswapV4ActionParameters<abi, functionName, args>) {
    this.items.push(config);
  }

  finalizeSwap(
    inputCurrency: Address,
    outputCurrency: Address,
    swapRecipient: Address,
    payIsUser: Boolean,
  ) {
    this.addAction({
      name: "settle",
      args: [inputCurrency, ActionConstants.OPEN_DELTA, payIsUser],
    } as any);
    this.addAction({
      name: "take",
      args: [outputCurrency, swapRecipient, ActionConstants.OPEN_DELTA],
    } as any);
  }

  encode() {
    const actions: Array<number> = [];
    const params: Array<Hex> = [];

    this.items.map((item) => {
      const abiItem = getAbiItem({
        abi: UniswapV4PoolManagerAbi,
        name: item.name as AbiItemName<typeof UniswapV4PoolManagerAbi>,
        args: item.args as AbiItemArgs<typeof UniswapV4PoolManagerAbi>,
      });
      const data = encodeAbiParameters(abiItem.inputs, item.args as any);

      params.push(data);
      actions.push(
        UniswapV4PoolActions[item.name as keyof typeof UniswapV4PoolActions],
      );
    });

    return new BaseActions({
      actions: Uint8Array.from(actions),
      params,
    });
  }
}
