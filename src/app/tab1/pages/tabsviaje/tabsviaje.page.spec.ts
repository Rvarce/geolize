import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsviajePage } from './tabsviaje.page';

describe('TabsviajePage', () => {
  let component: TabsviajePage;
  let fixture: ComponentFixture<TabsviajePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabsviajePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsviajePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
