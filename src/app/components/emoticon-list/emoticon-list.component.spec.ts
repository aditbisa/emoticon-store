import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { EmoticonListModule } from './emoticon-list.module';
import { EmoticonListComponent } from './emoticon-list.component';

describe('EmoticonListComponent', () => {
  let component: EmoticonListComponent;
  let fixture: ComponentFixture<EmoticonListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [EmoticonListComponent],
      imports: [EmoticonListModule],
    }).compileComponents();

    fixture = TestBed.createComponent(EmoticonListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
