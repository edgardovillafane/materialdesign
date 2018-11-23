import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoArbolComponent } from './listado-arbol.component';

describe('ListadoArbolComponent', () => {
  let component: ListadoArbolComponent;
  let fixture: ComponentFixture<ListadoArbolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoArbolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoArbolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
