import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComentarioPage } from './comentario.page';

describe('ComentarioPage', () => {
  let component: ComentarioPage;
  let fixture: ComponentFixture<ComentarioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComentarioPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComentarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
