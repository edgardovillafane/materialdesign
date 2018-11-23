import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteLicComponent } from './delete-lic.component';

describe('DeleteLicComponent', () => {
  let component: DeleteLicComponent;
  let fixture: ComponentFixture<DeleteLicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteLicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteLicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
