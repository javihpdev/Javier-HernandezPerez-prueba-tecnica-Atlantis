import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZedAirlinesListComponent } from './zed-airlines-list.component';
import {RouterTestingModule} from "@angular/router/testing";
import {LocalizeRouterModule} from "@gilsdav/ngx-translate-router";
import {TranslateModule} from "@ngx-translate/core";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('ZedAirlinesListComponent', () => {
  let component: ZedAirlinesListComponent;
  let fixture: ComponentFixture<ZedAirlinesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ZedAirlinesListComponent,
        RouterTestingModule,
        LocalizeRouterModule.forRoot([]),
        TranslateModule.forRoot(),
        BrowserAnimationsModule
      ],
      teardown: { destroyAfterEach: false }
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZedAirlinesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
