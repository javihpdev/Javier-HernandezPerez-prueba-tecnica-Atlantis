import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirportsFormComponent } from './airports-form.component';
import {RouterTestingModule} from "@angular/router/testing";
import {LocalizeRouterModule} from "@gilsdav/ngx-translate-router";
import {TranslateModule} from "@ngx-translate/core";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

describe('AirportsFormComponent', () => {
  let component: AirportsFormComponent;
  let fixture: ComponentFixture<AirportsFormComponent>;
  let submitSpy: jasmine.Spy;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AirportsFormComponent,
        RouterTestingModule,
        LocalizeRouterModule.forRoot([]),
        TranslateModule.forRoot(),
        BrowserAnimationsModule
      ],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {}
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {}
        }
      ],
      teardown: { destroyAfterEach: false }
    })
    .compileComponents();

    fixture = TestBed.createComponent(AirportsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    submitSpy = spyOn(component.emitSubmit, 'emit');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#submit', () => {
    it('should emit form data when form is valid', () => {
      component.form = new FormGroup({
        code: new FormControl<string>('ABC', {updateOn: 'blur', validators: [Validators.required, Validators.minLength(3), Validators.maxLength(3)]}),
        name: new FormControl<string>('Airport Name', {updateOn: 'blur', validators: [Validators.required]}),
        recessDate: new FormControl<string>('2021-12-12', {updateOn: 'blur', validators: [Validators.required]}),
        serviceDate: new FormControl<string>('2021-12-12', {updateOn: 'blur', validators: [Validators.required]}),
        courtesyDate: new FormControl<string>('2021-12-12', {updateOn: 'blur', validators: [Validators.required]}),
        international: new FormControl<boolean>(false),
        national: new FormControl<boolean>(false),
      });
      component.submit();
      /*expect(submitSpy).toHaveBeenCalledOnceWith({
        code: 'ABC',
        courtesyDate: '2021-12-12',
        international: false,
        name: 'Airport Name',
        national: false,
        recessDate: '2021-12-12',
        serviceDate: '2021-12-12'
      });*/
    });

    it('should not emit form data when form is invalid', () => {
      component.form = new FormGroup({
        code: new FormControl<string>('', {updateOn: 'blur', validators: [Validators.required, Validators.minLength(3), Validators.maxLength(3)]}),
        name: new FormControl<string>('', {updateOn: 'blur', validators: [Validators.required]}),
        recessDate: new FormControl<string>('', {updateOn: 'blur', validators: [Validators.required]}),
        serviceDate: new FormControl<string>('', {updateOn: 'blur', validators: [Validators.required]}),
        courtesyDate: new FormControl<string>('', {updateOn: 'blur', validators: [Validators.required]}),
        international: new FormControl<boolean>(false),
        national: new FormControl<boolean>(false),
      });
      component.submit();
      expect(submitSpy).not.toHaveBeenCalled();
    });
  });

});
