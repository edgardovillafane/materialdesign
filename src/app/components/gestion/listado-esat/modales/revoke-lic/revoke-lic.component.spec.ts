import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RevokeLicComponent } from './revoke-lic.component';

describe('RevokeLicComponent', () => {
  let component: RevokeLicComponent;
  let fixture: ComponentFixture<RevokeLicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RevokeLicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevokeLicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
