import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenewLicComponent } from './renew-lic.component';

describe('RenewLicComponent', () => {
  let component: RenewLicComponent;
  let fixture: ComponentFixture<RenewLicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenewLicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenewLicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
