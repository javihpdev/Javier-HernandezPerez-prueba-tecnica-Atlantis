import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputComponent } from './input.component';
import {testCommonModules, testCommonProviders} from "../../../../test";

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        InputComponent,
        ...testCommonModules
      ],
      providers:[
        ...testCommonProviders
      ],
      teardown: { destroyAfterEach: false }
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
