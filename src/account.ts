import type { Address } from "abitype";
import {
  concatHex,
  getContract,
  hexToBigInt,
  pad,
  toHex,
  type Chain,
  type Hex,
  type PublicClient,
} from "viem";
import { LicredityAccountAbi } from "./abis/LicredityAccount";

export const formatNonFungible = (nft: Address, tokenId: bigint) => {
  return toHex(
    (hexToBigInt(nft) << 96n) | (tokenId & BigInt("0xffffffffffffffff")),
  );
};

export class LicredityAccount {
  contract;
  deadSeconds: number;
  owner: Address;
  chain: Chain;

  constructor(
    account: Address,
    manager: Address,
    client: PublicClient,
    deadSeconds: number,
  ) {
    this.contract = getContract({
      address: manager,
      abi: LicredityAccountAbi,
      client,
    });
    this.deadSeconds = deadSeconds;
    this.owner = account;
    this.chain = client.chain!;
  }

  async appointNextGovernor(nextGovernor: Address) {
    await this.contract.write.appointNextGovernor([nextGovernor], {
      account: this.owner,
      chain: this.chain,
    });
  }

  async confirmNextGovernor() {
    await this.contract.write.confirmNextGovernor({
      account: this.owner,
      chain: this.chain,
    });
  }

  async updateLicredityWhitelist(market: Address, isWhitelist: boolean) {
    await this.contract.write.updateLicredityMarketWhitelist(
      [market, isWhitelist],
      {
        account: this.owner,
        chain: this.chain,
      },
    );
  }

  async updateRouterWhitelist(router: Address, isWhitelist: boolean) {
    await this.contract.write.updateRouterWhitelist([router, isWhitelist], {
      account: this.owner,
      chain: this.chain,
    });
  }

  async updateTokenPermit2(config: {
    token: Address;
    spender: Address;
    amount: bigint;
    expiration: number;
  }) {
    await this.contract.write.updateTokenPermit2(
      [config.token, config.spender, config.amount, config.expiration],
      {
        account: this.owner,
        chain: this.chain,
      },
    );
  }

  async updateTokenApprove(config: {
    token: Address;
    spender: Address;
    amount: bigint;
  }) {
    await this.contract.write.updateTokenApporve(
      [config.token, config.spender, config.amount],
      {
        account: this.owner,
        chain: this.chain,
      },
    );
  }

  async open(market: Address) {
    await this.contract.write.open([market], {
      account: this.owner,
      chain: this.chain,
    });
  }

  async close(market: Address, positionId: bigint) {
    await this.contract.write.close([market, positionId], {
      account: this.owner,
      chain: this.chain,
    });
  }

  async sweepFungible(config: {
    currency: Address;
    amount: bigint;
    recipient: Address;
  }) {
    await this.contract.write.sweepFungible(
      [config.currency, config.recipient, config.amount],
      {
        account: this.owner,
        chain: this.chain,
      },
    );
  }

  async sweepNonFungible(config: {
    nft: Address;
    tokenId: bigint;
    recipient: Address;
  }) {
    const nonFungible = formatNonFungible(config.nft, config.tokenId);
    await this.contract.write.sweepNonFungible(
      [nonFungible, config.recipient],
      {
        account: this.owner,
        chain: this.chain,
      },
    );
  }

  async execute(market: Address, inputs: Hex) {
    const deadline = BigInt(Math.floor(Date.now() / 1000) + this.deadSeconds);

    await this.contract.write.execute([market, inputs, deadline], {
      account: this.owner,
      chain: this.chain,
    });
  }
}
