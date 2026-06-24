import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirportsListComponent } from './airports-list.component';
import {RouterTestingModule} from "@angular/router/testing";
import {LocalizeRouterModule} from "@gilsdav/ngx-translate-router";
import {TranslateModule} from "@ngx-translate/core";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('AirportsListComponent', () => {
  let component: AirportsListComponent;
  let fixture: ComponentFixture<AirportsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AirportsListComponent,
        RouterTestingModule,
        LocalizeRouterModule.forRoot([]),
        TranslateModule.forRoot(),
        BrowserAnimationsModule
      ],
      teardown: { destroyAfterEach: false }
    })
    .compileComponents();

    fixture = TestBed.createComponent(AirportsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
