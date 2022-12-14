import { TestBed } from '@angular/core/testing';
import Contract from 'web3-eth-contract';
import { environment as env } from '@env';
import { Web3Service } from './web3.service';

// Need local network! And don't forget to migrate the contract and update the address in env.
const ownerAccount = env.testOwnerAddress;
const buyerAccount = env.testBuyerAddress;

describe('Web3Service', () => {
  let service: Web3Service;

  beforeEach(async () => {
    (window as any)['ethereum'] = null;
    (window as any)['web3'] = null;

    TestBed.configureTestingModule({});
    service = TestBed.inject(Web3Service);
    await service.setup();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve the accounts', async () => {
    const accounts = await service.getAccounts();
    expect(accounts.includes(ownerAccount)).toBeTrue();
    expect(accounts.includes(buyerAccount)).toBeTrue();
  });

  it('should retrieve the active account', async () => {
    const account = await service.getActiveAccount();
    expect(account).toBe(buyerAccount);
  });

  describe('should retrieve the contract', async () => {
    let contract: Contract<typeof env.contractAbi>;

    beforeEach(() => {
      contract = service.getContract();
    });

    it('should have correct owner', async () => {
      // @ts-ignore: 2 errors, methods any type and return type.
      const owner: string = await contract.methods.getStoreOwner().call();
      expect(owner).toEqual(ownerAccount);
    });
  });
});
