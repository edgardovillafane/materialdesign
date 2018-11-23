import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerListadosComponent } from './container-listados.component';

describe('ContainerListadosComponent', () => {
  let component: ContainerListadosComponent;
  let fixture: ComponentFixture<ContainerListadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContainerListadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerListadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
