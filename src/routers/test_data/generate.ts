import { createPublicClient, http, zeroAddress, type Address } from "viem";
import { mainnet } from "viem/chains";
import { NATIVE_ADDRESS } from "../base";
import { odosQuote, odosSwap } from "../odos";
import { pendleSwap } from "../pendle";
import { veloraSwap } from "../velora";

const paraswapNativePath = "./test_data/paraswap_native.json";
const paraswapTokenPath = "./test_data/paraswap_token.json";

const odosSwapNativePath = "./test_data/odosswap_native.json";
const odosSwapTokenPath = "./test_data/odosswap_token.json";

const pendleSwapNativePath = "./test_data/pendleswap_native.json";
const pendleSwapTokenPath = "./test_data/pendleswap_token.json";

const userAddress: Address = "0x67411b21cAC859b840693bF5e21C5481F1288D97";

const USDC: Address = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
const ptcUSDO: Address = "0xB10DA2F9147f9cf2B8826877Cd0c95c18A0f42dc";

const client = createPublicClient({
  chain: mainnet,
  transport: http(process.env.RPC_URL),
});

const paraswapNativeReturn = await veloraSwap(
  {
    userAddress,
    srcTokenAddr: NATIVE_ADDRESS,
    destTokenAddr: USDC,
    amount: "5",
    network: mainnet,
    side: "exactIn",
    slippage: 0.05,
  },
  client,
);

const paraswapTokenReturn = await veloraSwap(
  {
    userAddress,
    srcTokenAddr: USDC,
    destTokenAddr: NATIVE_ADDRESS,
    amount: "5000",
    network: mainnet,
    side: "exactIn",
    slippage: 0.05,
  },
  client,
);

const odosNativeQuote = await odosQuote(
  {
    userAddress,
    srcTokenAddr: zeroAddress,
    destTokenAddr: USDC,
    amount: "5",
    network: mainnet,
    slippage: 0.05,
  },
  client,
);

const odosNativeReturn = await odosSwap(
  odosNativeQuote.pathId,
  userAddress,
  userAddress,
);

const odosTokenQuote = await odosQuote(
  {
    userAddress,
    srcTokenAddr: USDC,
    destTokenAddr: zeroAddress,
    amount: "5000",
    network: mainnet,
    slippage: 0.05,
  },
  client,
);

const odosTokenReturn = await odosSwap(
  odosTokenQuote.pathId,
  userAddress,
  userAddress,
);

const pendleNativeReturn = await pendleSwap(
  {
    userAddress,
    srcTokenAddr: zeroAddress,
    destTokenAddr: ptcUSDO,
    amount: "5",
    network: mainnet,
    slippage: 0.05,
  },
  client,
);

const pendleTokenReturn = await pendleSwap(
  {
    userAddress,
    srcTokenAddr: USDC,
    destTokenAddr: ptcUSDO,
    amount: "5000",
    network: mainnet,
    slippage: 0.05,
  },
  client,
);

await Bun.write(
  paraswapNativePath,
  JSON.stringify(paraswapNativeReturn, null, 2),
);

await Bun.write(
  paraswapTokenPath,
  JSON.stringify(paraswapTokenReturn, null, 2),
);

await Bun.write(odosSwapNativePath, JSON.stringify(odosNativeReturn, null, 2));
await Bun.write(odosSwapTokenPath, JSON.stringify(odosTokenReturn, null, 2));

await Bun.write(
  pendleSwapNativePath,
  JSON.stringify(pendleNativeReturn, null, 2),
);
await Bun.write(
  pendleSwapTokenPath,
  JSON.stringify(pendleTokenReturn, null, 2),
);
