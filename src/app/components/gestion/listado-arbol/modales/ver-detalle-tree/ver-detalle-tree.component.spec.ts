import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerDetalleTreeComponent } from './ver-detalle-tree.component';

describe('VerDetalleTreeComponent', () => {
  let component: VerDetalleTreeComponent;
  let fixture: ComponentFixture<VerDetalleTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerDetalleTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerDetalleTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
