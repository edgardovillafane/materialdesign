import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerDetalleEsatComponent } from './ver-detalle-esat.component';

describe('VerDetalleEsatComponent', () => {
  let component: VerDetalleEsatComponent;
  let fixture: ComponentFixture<VerDetalleEsatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerDetalleEsatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerDetalleEsatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
