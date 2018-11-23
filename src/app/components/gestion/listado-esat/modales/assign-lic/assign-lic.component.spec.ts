import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignLicComponent } from './assign-lic.component';

describe('AssignLicComponent', () => {
  let component: AssignLicComponent;
  let fixture: ComponentFixture<AssignLicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignLicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignLicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
