import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ɵInternalFormsSharedModule } from '@angular/forms';
import {TranslateModule} from "@ngx-translate/core";
import { InputComponent } from '../../components/atoms/input/input.component';
import { CheckboxComponent } from '../../components/atoms/checkbox/checkbox.component';
import { ButtonComponent } from '../../components/atoms/button/button.component';

@Component({
    selector: 'app-design-system',
    imports: [
    TranslateModule,
    InputComponent,
    CheckboxComponent,
    ButtonComponent,
    ɵInternalFormsSharedModule
],
    templateUrl: './design-system.component.html',
    styleUrls: ['./design-system.component.scss']
})

export class DesignSystemComponent implements OnInit {

    form: FormGroup = new FormGroup({
        inputPwd: new FormControl<string>(''),
        inputDis: new FormControl<string>(''),
        inputReq: new FormControl<string>('', {validators:[Validators.required]}),
        checkBox1: new FormControl<boolean>(false),
        checkBox2: new FormControl<boolean>(false),
        checkBox3: new FormControl<boolean>(false),
        checkBox4: new FormControl<boolean>(false),
        toggle1: new FormControl<boolean>(false),
        toggle2: new FormControl<boolean>(false),
        radio: new FormControl<boolean>(false),
        selectField1: new FormControl<string>(''),
    });

    ngOnInit(): void {
        this.form.get('inputDis')?.disable();
        this.form.get('checkBox3')?.setValue(true);
        this.form.get('radio')?.setValue('2');
        this.form.get('toggle1')?.setValue(true);
        this.form.get('toggle2')?.setValue(false);
    
    }

    buttonClick() {
        alert("Button clicked");
    }
}
