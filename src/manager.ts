import {
  erc20Abi,
  getContract,
  publicActions,
  type Address,
  type Chain,
  type Hex,
  type PublicClient,
  type WalletClient,
} from "viem";
import { LicredityPositionManagerAbi } from "./abis/LicredityPositionManager";
import type { LicredityActionsBuilder } from "./actions/LicredityActions";

type ExecuteInput = {
  tokenId: bigint;
  unlockData: Hex;
};

export class LicredityPositionManager {
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
      abi: LicredityPositionManagerAbi,
      client,
    });
    this.deadSeconds = deadSeconds;
    this.owner = account;
    this.chain = client.chain!;
  }

  async execute(inputs: ExecuteInput[]) {
    const deadline = BigInt(Math.floor(Date.now() / 1000) + this.deadSeconds);

    await this.contract.write.execute([inputs, deadline], {
      account: this.owner,
      chain: this.chain,
    });
  }
}

export class LicredityPosition {
  manager;
  owner: Address;
  tokenId: bigint;
  client;
  chain: Chain;

  constructor(
    manager: Address,
    account: Address,
    tokenId: bigint,
    client: WalletClient,
  ) {
    this.client = client.extend(publicActions);
    this.manager = getContract({
      address: manager,
      abi: LicredityPositionManagerAbi,
      client,
    });
    this.tokenId = tokenId;
    this.owner = account;
    this.chain = client.chain!;
  }

  async approve(spender: Address) {
    this.manager.write.approve([spender, this.tokenId], {
      account: this.owner,
      chain: this.chain,
    });
  }

  async close() {
    this.manager.write.burn([this.tokenId], {
      account: this.owner,
      chain: this.chain,
    });
  }

  async depositFungible(token: Address, amount: bigint) {
    const approvedAmount = await this.client.readContract({
      address: token,
      abi: erc20Abi,
      functionName: "allowance",
      args: [this.owner, this.manager.address],
    });

    if (approvedAmount < amount) {
      throw Error("Approve Small");
    } else {
      await this.manager.write.depositFungible([this.tokenId, token, amount], {
        account: this.owner,
        chain: this.chain,
      });
    }
  }

  async depositNonFungible(nft: Address, tokenId: bigint) {
    await this.manager.write.depositNonFungible([this.tokenId, nft, tokenId], {
      account: this.owner,
      chain: this.chain,
    });
  }

  async repayDebt(amount: bigint = 0n) {
    if (amount === 0n) {
      await this.manager.write.decreaseDebtShare([this.tokenId, 0n], {
        account: this.owner,
        chain: this.chain,
      });
    } else {
      await this.manager.write.decreaseDebtAmount([this.tokenId, amount], {
        account: this.owner,
        chain: this.chain,
      });
    }
  }

  wirte(actions: LicredityActionsBuilder): ExecuteInput {
    return {
      tokenId: this.tokenId,
      unlockData: actions.encode().toCalldata(),
    };
  }
}
