import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadcrumbComponent } from './breadcrumb.component';
import {RouterTestingModule} from "@angular/router/testing";
import {LocalizeRouterModule} from "@gilsdav/ngx-translate-router";
import {TranslateModule} from "@ngx-translate/core";

describe('BreadcrumbComponent', () => {
  let component: BreadcrumbComponent;
  let fixture: ComponentFixture<BreadcrumbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BreadcrumbComponent,
        RouterTestingModule,
        LocalizeRouterModule.forRoot([]),
        TranslateModule.forRoot(),
      ],
      teardown: { destroyAfterEach: false }
    })
    .compileComponents();

    fixture = TestBed.createComponent(BreadcrumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should give correct router link when getRouterLink method is called', () => {
    component.url = ['maestros', 'aeropuertos'];
    const response = component.getRouterLink('maestros');
    expect(response).toEqual(['/', 'es', 'maestros']);
    const response2 = component.getRouterLink('aeropuertos');
    expect(response2).toEqual(['/', 'es', 'aeropuertos']);
  });

});
