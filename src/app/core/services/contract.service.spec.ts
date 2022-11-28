import { TestBed } from '@angular/core/testing';
import { environment as env } from '@env';
import Web3 from 'web3';
import { ContractService } from './contract.service';
import { Web3Service } from './web3.service';

const ownerAccount = env.testOwnerAddress;
const buyerAccount = env.testBuyerAddress;
const codePoint = parseInt(String(Date.now()).slice(-4));

describe('ContractService', () => {
  let service: ContractService;
  let web3ServiceSpy: jasmine.SpyObj<Web3Service>;
  let web3Provider: any;
  let web3: Web3;

  beforeEach(async () => {
    web3Provider = new Web3.providers.HttpProvider(
      'http://172.30.144.1:7545' //http://localhost:7545'
    );
    web3 = new Web3(web3Provider);
    const contract = new web3.eth.Contract(
      env.contractAbi,
      env.contractAddress
    );

    web3ServiceSpy = jasmine.createSpyObj('Web3Service', ['setup', 'getContract']);
    web3ServiceSpy.setup.and.stub();
    web3ServiceSpy.getContract.and.returnValue(contract);

    TestBed.configureTestingModule({
      providers: [{ provide: Web3Service, useValue: web3ServiceSpy }],
    });
    service = TestBed.inject(ContractService);
    await service.setup();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should process the purchase and trigger event', async () => {
    const buyerBalanceBefore = await web3.eth.getBalance(buyerAccount);
    const ownerBalanceBefore = await web3.eth.getBalance(ownerAccount);

    service.Purchase$.subscribe((data) => {
      expect(data.codePoint).toBe(codePoint);
      expect(data.buyer).toBe(buyerAccount);
    });

    await service.purchase(buyerAccount, codePoint, '1000000');

    const buyerBalanceAfter = await web3.eth.getBalance(buyerAccount);
    const ownerBalanceAfter = await web3.eth.getBalance(ownerAccount);

    expect(buyerBalanceBefore > buyerBalanceAfter).toBeTrue();
    expect(ownerBalanceBefore < ownerBalanceAfter).toBeTrue();
  });
});
