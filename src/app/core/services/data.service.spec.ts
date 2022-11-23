import { TestBed } from '@angular/core/testing';

import { DataService } from './data.service';
import { StorageService } from './storage.service';

describe('DataService', () => {
  let service: DataService;
  let storageSpy: jasmine.SpyObj<StorageService>;

  beforeEach(() => {
    storageSpy = jasmine.createSpyObj('StorageService', [
      'getData',
      'saveData',
    ]);
    storageSpy.getData.and.returnValue(`[
      {"codePoint":128512,"character":"😀","sold":false}
    ]`);

    TestBed.configureTestingModule({
      providers: [{ provide: StorageService, useValue: storageSpy }],
    });
    service = TestBed.inject(DataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return data', () => {
    expect(service.getData()).toEqual([
      { codePoint: 128512, character: '😀', sold: false },
    ]);
  });
});
