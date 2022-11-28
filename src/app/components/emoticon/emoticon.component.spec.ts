import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ContractService } from '@core/services';
import { EmoticonComponent } from './emoticon.component';

describe('EmoticonComponent', () => {
  let component: EmoticonComponent;
  let fixture: ComponentFixture<EmoticonComponent>;
  let contractServiceSpy: jasmine.SpyObj<ContractService>;

  beforeEach(waitForAsync(() => {
    contractServiceSpy = jasmine.createSpyObj('ContractService', ['purchase']);
    contractServiceSpy.purchase.and.stub();

    TestBed.configureTestingModule({
      providers: [{ provide: ContractService, useValue: contractServiceSpy }],
      declarations: [EmoticonComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(EmoticonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
