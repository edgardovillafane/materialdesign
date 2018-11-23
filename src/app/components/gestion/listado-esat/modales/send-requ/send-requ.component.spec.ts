import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendRequComponent } from './send-requ.component';

describe('SendRequComponent', () => {
  let component: SendRequComponent;
  let fixture: ComponentFixture<SendRequComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendRequComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendRequComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
