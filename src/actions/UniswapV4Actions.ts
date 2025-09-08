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
import { UniswapV4PoolManagerAbi } from "../abis/UniswapV4PoolManager";
import { BaseActions } from "./BaseActions";

const UniswapV4PoolActions = {
  swap: 0x0d,
  take: 0x0e,
  settle: 0x0f,
  sweep: 0x10,
} as const;

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
  private items: UniswapV4ActionParameters<abi, functionName, args>[] = [];

  constructor(items: UniswapV4ActionParameters<abi, functionName, args>[]) {
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

  addAction(config: UniswapV4ActionParameters<abi, functionName, args>) {
    this.items.push(config);
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

const params = UniswapV4ActionsBuilder.fromArray([
  {
    name: "swap",
    args: [
      {
        currency0: "0xA4f65241CBC09188C60908AAF083e12C54E6d898",
        currency1: "0xA4f65241CBC09188C60908AAF083e12C54E6d898",
        fee: 1,
        tickSpacing: 1,
        hooks: "0x1e5FF53314E5460ad6Bd0F7DAf05FB4021Afa788",
      },
      {
        zeroForOne: true,
        amountSpecified: -1000n,
        sqrtPriceLimitX96: 1n,
      },
      "0x",
    ],
  },
])
  .encode()
  .toCalldata();

// console.log(actions);
console.log(params);
