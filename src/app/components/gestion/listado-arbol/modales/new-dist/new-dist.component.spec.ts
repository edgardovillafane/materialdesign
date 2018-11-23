import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDistComponent } from './new-dist.component';

describe('NewDistComponent', () => {
  let component: NewDistComponent;
  let fixture: ComponentFixture<NewDistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewDistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewDistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
