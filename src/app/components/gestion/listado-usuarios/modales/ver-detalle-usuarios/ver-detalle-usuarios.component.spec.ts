import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerDetalleUsuariosComponent } from './ver-detalle-usuarios.component';

describe('VerDetalleUsuariosComponent', () => {
  let component: VerDetalleUsuariosComponent;
  let fixture: ComponentFixture<VerDetalleUsuariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerDetalleUsuariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerDetalleUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
