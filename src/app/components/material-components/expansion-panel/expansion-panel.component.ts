import {Component, Input, ViewChild} from '@angular/core';
import {MatExpansionModule, MatExpansionPanel} from "@angular/material/expansion";
import {TranslateModule} from "@ngx-translate/core";

@Component({
    selector: 'app-expansion-panel',
    imports: [
        MatExpansionModule,
        TranslateModule
    ],
    templateUrl: './expansion-panel.component.html',
    styleUrl: './expansion-panel.component.scss'
})
export class ExpansionPanelComponent {
  @ViewChild(MatExpansionPanel) expansionPanel!: MatExpansionPanel

  @Input() title: string = 'Filtros';
}
