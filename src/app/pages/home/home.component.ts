import { Component } from '@angular/core';
import {TranslateModule} from "@ngx-translate/core";
import { ButtonComponent } from '../../components/atoms/button/button.component';

@Component({
    selector: 'app-home',
    imports: [
        TranslateModule,
        ButtonComponent,
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent {

}
