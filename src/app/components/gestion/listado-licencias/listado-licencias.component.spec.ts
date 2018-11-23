import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoLicenciasComponent } from './listado-licencias.component';

describe('ListadoLicenciasComponent', () => {
  let component: ListadoLicenciasComponent;
  let fixture: ComponentFixture<ListadoLicenciasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoLicenciasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoLicenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
