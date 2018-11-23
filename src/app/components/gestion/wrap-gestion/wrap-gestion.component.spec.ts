import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WrapGestionComponent } from './wrap-gestion.component';

describe('WrapGestionComponent', () => {
  let component: WrapGestionComponent;
  let fixture: ComponentFixture<WrapGestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WrapGestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WrapGestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
