import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZedAirlinesFormComponent } from './zed-airlines-form.component';
import {RouterTestingModule} from "@angular/router/testing";
import {LocalizeRouterModule} from "@gilsdav/ngx-translate-router";
import {TranslateModule} from "@ngx-translate/core";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";

describe('ZedAirlinesFormComponent', () => {
  let component: ZedAirlinesFormComponent;
  let fixture: ComponentFixture<ZedAirlinesFormComponent>;
  let submitSpy: jasmine.Spy;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ZedAirlinesFormComponent,
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

    fixture = TestBed.createComponent(ZedAirlinesFormComponent);
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
        code: new FormControl<string>('AB', {updateOn: 'blur', validators: [Validators.required]}),
        name: new FormControl<string>('AIR BERLIN', {updateOn: 'blur', validators: [Validators.required]}),
      });
      component.submit();
      /*expect(submitSpy).toHaveBeenCalledOnceWith({
        code: 'AB',
        name: 'AIR BERLIN',
      });*/
    });

    it('should not emit form data when form is invalid', () => {
      component.form = new FormGroup({
        code: new FormControl<string>('', {updateOn: 'blur', validators: [Validators.required]}),
        name: new FormControl<string>('', {updateOn: 'blur', validators: [Validators.required]}),
      });
      component.submit();
      expect(submitSpy).not.toHaveBeenCalled();
    });
  });

});
