import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";

@Component({
    selector: 'app-e404',
    imports: [
        RouterLink,
        TranslateModule
    ],
    templateUrl: './e404.component.html',
    styleUrl: './e404.component.scss'
})
export class E404Component {

}
