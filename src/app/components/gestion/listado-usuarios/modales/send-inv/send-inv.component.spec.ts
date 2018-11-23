import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendInvComponent } from './send-inv.component';

describe('SendInvComponent', () => {
  let component: SendInvComponent;
  let fixture: ComponentFixture<SendInvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendInvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendInvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
