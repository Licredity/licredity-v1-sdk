import type { Address } from "abitype";
import { parseUnits, type Chain, type Hex, type PublicClient } from "viem";
import { getTokenDecimals } from "./base";

const PARASWAP_ENDPOINT = "https://api.paraswap.io/";

export interface ParaSwapReturn {
  priceRoute: {
    blockNumber: number;
    srcToken: Address;
    srcDecimals: number;
    srcAmount: string;
    destToken: Address;
    destDecimals: number;
    destAmount: string;
    contractAddress: Address;
  };
  txParams: {
    to: Address;
    value: number;
    data: Hex;
    chainId: number;
  };
}

// amount: srcToken amount (in case of SELL) or destToken amount (in case of BUY).
export const swap = async (
  config: {
    userAddress: Address;
    srcTokenAddr: Address;
    destTokenAddr: Address;
    amount: string;
    network: Chain;
    side: "destToSrc" | "srcToDest";
    slippage: number;
  },
  client: PublicClient,
) => {
  const srcDecimals = await getTokenDecimals(config.srcTokenAddr, client);
  const destDecimals = await getTokenDecimals(config.destTokenAddr, client);

  let parsedAmount = 0n;
  let parseSide: "SELL" | "BUY";

  if (config.side === "destToSrc") {
    parsedAmount = parseUnits(config.amount, destDecimals);
    parseSide = "BUY";
  } else {
    parsedAmount = parseUnits(config.amount, srcDecimals);
    parseSide = "SELL";
  }

  const params = new URLSearchParams({
    srcToken: config.srcTokenAddr,
    srcDecimals: srcDecimals.toString(),
    destToken: config.destTokenAddr,
    destDecimals: destDecimals.toString(),
    amount: parsedAmount.toString(),
    network: config.network.id.toString(),
    slippage: (config.slippage * 100).toString(),
    side: parseSide,
    version: "6.2",
    userAddress: config.userAddress,
  });

  const response = await fetch(
    PARASWAP_ENDPOINT + "/swap?" + params.toString(),
    {
      method: "GET",
    },
  );

  const body = (await response.json()) as ParaSwapReturn;

  return body.txParams;
};
