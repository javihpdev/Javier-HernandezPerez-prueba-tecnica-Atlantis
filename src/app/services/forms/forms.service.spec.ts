import { TestBed } from '@angular/core/testing';

import { FormsService } from './forms.service';
import {FormControl, FormGroup, Validators} from "@angular/forms";

describe('FormsService', () => {
  let service: FormsService;
  let form: FormGroup;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormsService);
    form = new FormGroup({ userName: new FormControl('', Validators.required) });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('isInvalid', () => {
    it('should return true when the control is invalid', () => {
      form.controls['userName'].markAsTouched();
      expect(service.isInvalid(form, 'userName')).toBeTruthy();
    });

    it('should return false when the control is valid', () => {
      form.controls['userName'].setValue('test');
      form.controls['userName'].markAsDirty();
      expect(service.isInvalid(form, 'userName')).toBeFalsy();
    });
  });
});
