import { ComponentFixture, TestBed } from '@angular/core/testing';

import { E404Component } from './e404.component';
import {RouterTestingModule} from "@angular/router/testing";
import {LocalizeRouterModule} from "@gilsdav/ngx-translate-router";
import {TranslateModule} from "@ngx-translate/core";

describe('E404Component', () => {
  let component: E404Component;
  let fixture: ComponentFixture<E404Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        E404Component,
        RouterTestingModule,
        LocalizeRouterModule.forRoot([]),
        TranslateModule.forRoot(),
      ],
      teardown: { destroyAfterEach: false }
    })
    .compileComponents();

    fixture = TestBed.createComponent(E404Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
