import { TestBed } from '@angular/core/testing';

import { StorageService } from './storage.service';

describe('StorageService', () => {
  let service: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should store data', () => {
    service.saveData('data', '{data:[1,2,3]}');
    expect(localStorage.getItem('data')).toBe('{data:[1,2,3]}');
  });

  it('should retrieve data by key', () => {
    localStorage.setItem('data', '12345');
    expect(service.getData('data')).toBe('12345');
  });

  it('should return null on non-existent key', () => {
    localStorage.removeItem('not-exists');
    expect(service.getData('not-exists')).toBeNull();
  });

  it('should remove data by key', () => {
    localStorage.setItem('data', 'adit-here');
    service.removeData('data');
    expect(localStorage.getItem('data')).toBeNull();
  });

  it('should clear all data', () => {
    localStorage.setItem('data1', '123');
    localStorage.setItem('data2', '456');
    service.clearData();
    expect(localStorage.length).toBe(0);
    expect(localStorage.getItem('data1')).toBeNull();
    expect(localStorage.getItem('data2')).toBeNull();
  });
});
