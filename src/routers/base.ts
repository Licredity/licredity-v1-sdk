import {
  erc20Abi,
  getContract,
  isAddressEqual,
  zeroAddress,
  type Address,
  type PublicClient,
} from "viem";

export const NATIVE_ADDRESS: Address =
  "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";

export const getTokenDecimals = async (
  tokenAddr: Address,
  client: PublicClient,
) => {
  if (isAddressEqual(tokenAddr, NATIVE_ADDRESS)) {
    return 18;
  } else if (isAddressEqual(tokenAddr, zeroAddress)) {
    return 18;
  } else {
    const token = getContract({
      address: tokenAddr,
      abi: erc20Abi,
      client: client,
    });

    return token.read.decimals();
  }
};
