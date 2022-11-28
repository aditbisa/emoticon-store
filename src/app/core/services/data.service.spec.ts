import { TestBed } from '@angular/core/testing';

import { DataService } from './data.service';
import { StorageService } from './storage.service';
import { Web3Service } from './web3.service';
import { ContractService } from './contract.service';

describe('DataService', () => {
  let service: DataService;
  let storageSpy: jasmine.SpyObj<StorageService>;
  let web3ServiceSpy: jasmine.SpyObj<Web3Service>;
  let contractServiceSpy: jasmine.SpyObj<ContractService>;

  beforeEach(() => {
    storageSpy = jasmine.createSpyObj('StorageService', [
      'getData',
      'saveData',
    ]);
    storageSpy.getData.and.returnValue(`[
      {"codePoint":128512,"character":"😀","group":"Smiley Face","name":"Smiling face","state":0}
    ]`);

    (window as any)['ethereum'] = null;
    (window as any)['web3'] = null;

    web3ServiceSpy = jasmine.createSpyObj('Web3Service', ['setup']);
    web3ServiceSpy.setup.and.returnValue(Promise.resolve());

    contractServiceSpy = jasmine.createSpyObj('ContractService', ['setup', 'getPurchased']);
    contractServiceSpy.setup.and.returnValue(Promise.resolve());
    contractServiceSpy.getPurchased.and.returnValue(Promise.resolve([]));

    TestBed.configureTestingModule({
      providers: [
        { provide: StorageService, useValue: storageSpy },
        { provide: Web3Service, useValue: web3ServiceSpy },
        { provide: ContractService, useValue: contractServiceSpy },
      ],
    });
    service = TestBed.inject(DataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return data', () => {
    expect(service.getCollection()).toEqual([
      {
        codePoint: 128512,
        character: '😀',
        group: 'Smiley Face',
        name: 'Smiling face',
        state: 0,
      },
    ]);
  });
});
