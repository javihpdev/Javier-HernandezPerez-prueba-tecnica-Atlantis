import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackbarComponent } from './snackbar.component';
import {MAT_SNACK_BAR_DATA, MatSnackBarModule, MatSnackBarRef} from "@angular/material/snack-bar";
import {RouterTestingModule} from "@angular/router/testing";
import {LocalizeRouterModule} from "@gilsdav/ngx-translate-router";
import {TranslateModule} from "@ngx-translate/core";

describe('SnackbarComponent', () => {
  let component: SnackbarComponent;
  let fixture: ComponentFixture<SnackbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SnackbarComponent,
        MatSnackBarModule,
        RouterTestingModule,
        LocalizeRouterModule.forRoot([]),
        TranslateModule.forRoot(),
      ],
      providers: [
        {
          provide: MAT_SNACK_BAR_DATA,
          useValue: {}
        },
        {
          provide: MatSnackBarRef,
          useValue: {}
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
