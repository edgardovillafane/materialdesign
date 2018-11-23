import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignDictioComponent } from './assign-dictio.component';

describe('AssignDictioComponent', () => {
  let component: AssignDictioComponent;
  let fixture: ComponentFixture<AssignDictioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignDictioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignDictioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
