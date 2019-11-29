import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValoracionPage } from './valoracion.page';

describe('ValoracionPage', () => {
  let component: ValoracionPage;
  let fixture: ComponentFixture<ValoracionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValoracionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValoracionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
