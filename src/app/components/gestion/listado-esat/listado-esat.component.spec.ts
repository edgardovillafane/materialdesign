import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoEsatComponent } from './listado-esat.component';

describe('ListadoEsatComponent', () => {
  let component: ListadoEsatComponent;
  let fixture: ComponentFixture<ListadoEsatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoEsatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoEsatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
