import {
  parseUnits,
  type Address,
  type Chain,
  type Hex,
  type PublicClient,
} from "viem";
import { getTokenDecimals } from "./base";

const BASE_URL = "https://api-v2.pendle.finance/core";

type Aggregator = "kyberswap" | "odos" | "okx" | "paraswap";

type Aggregators = {
  aggregators: {
    name: Aggregator;
    computingUnit: number;
  }[];
};

type PendleSwapReturn = {
  routes: {
    tx: {
      data: Hex;
    };
    outputs: {
      token: Address;
      amount: string;
    };
  }[];
};

export const getAggregators = async (chain: Chain) => {
  const data = await fetch(
    `${BASE_URL}/v1/sdk/${chain.id}/supported-aggregators`,
    {
      method: "GET",
    },
  );

  const aggregators = (await data.json()) as Aggregators;

  return aggregators;
};

export const swap = async (
  config: {
    userAddress: Address;
    srcTokenAddr: Address;
    destTokenAddr: Address;
    amount: string;
    network: Chain;
    slippage: number;
  },
  client: PublicClient,
  aggregators: Aggregator[] = ["okx"],
) => {
  const tokenDecimals = await getTokenDecimals(config.srcTokenAddr, client);
  const amount = parseUnits(config.amount, tokenDecimals);

  const aggregatorsFormat = (aggregators as string[]).reduce((acc, cur) =>
    acc.concat(",").concat(cur),
  );

  console.log(aggregatorsFormat);

  const params = new URLSearchParams({
    chainId: config.network.id.toString(),
    receiver: config.userAddress,
    slippage: config.slippage.toString(),
    enableAggregator: "true",
    aggregators: aggregatorsFormat,
    tokensIn: config.srcTokenAddr,
    amountsIn: amount.toString(),
    tokensOut: config.destTokenAddr,
  });

  const response = await fetch(
    `${BASE_URL}/v2/sdk/${config.network.id}/convert?${params.toString()}`,
    {
      method: "GET",
    },
  );

  const data = (await response.json()) as PendleSwapReturn;

  return data;
};
