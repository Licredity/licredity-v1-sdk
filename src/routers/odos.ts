import type { Address } from "abitype";
import { parseUnits, type Chain, type PublicClient } from "viem";
import { getTokenDecimals } from "./base";

const BASE_URL = "https://api.odos.xyz/sor";

type odosQuoteReturn = {
  traceId: string;
  inTokens: Address[];
  outTokens: Address[];
  inAmounts: bigint[];
  outAmounts: bigint[];
  blockNumber: number;
  pathId: string;
};

export const quote = async (
  config: {
    userAddress: Address;
    srcTokenAddr: Address;
    destTokenAddr: Address;
    amount: string;
    network: Chain;
    slippage: number;
  },
  client: PublicClient,
) => {
  const tokenDecimals = await getTokenDecimals(config.srcTokenAddr, client);
  const amount = parseUnits(config.amount, tokenDecimals);

  const quoteParams = {
    chainId: config.network.id,
    inputTokens: [
      {
        tokenAddress: config.srcTokenAddr,
        amount: amount.toString(),
      },
    ],
    outputTokens: [
      {
        tokenAddress: config.destTokenAddr,
        proportion: 1,
      },
    ],
    userAddr: config.userAddress,
    slippageLimitPercent: config.slippage * 100,
    disableRFQs: true,
    compact: true,
  };

  const reponse = await fetch(`${BASE_URL}/quote/v2`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(quoteParams),
  });

  const data = (await reponse.json()) as odosQuoteReturn;

  return data;
};

export const swap = async (
  pathId: string,
  userAddress: Address,
  receiver: Address,
) => {
  const assembleParams = {
    userAddr: userAddress,
    pathId,
    receiver,
  };

  const reponse = await fetch(`${BASE_URL}/assemble`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(assembleParams),
  });

  const data = await reponse.json();
  console.log(JSON.stringify(data));
};
