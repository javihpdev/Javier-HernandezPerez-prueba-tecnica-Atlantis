import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from "@angular/common";
import { LocalizeRouterService } from '@gilsdav/ngx-translate-router';

@Pipe({
  standalone: true,
  name: 'localizedDate'
})
export class LocalizedDatePipe implements PipeTransform {

  constructor(private readonly _localize: LocalizeRouterService) {
  }

  transform(value: Date | string | number, format = 'mediumDate', deletePoint: boolean = false): string {

    if (value && typeof value === 'string' || value instanceof String) {
      if(value.length <= 10){
        value = value  + "T00:00:00+00:00";
      }
      value = value.replaceAll(/\+\d{2}/g, "+00");
      value = value.replaceAll("0001-", "2023-");
    }

    const datePipe = new DatePipe(this._localize.parser.currentLang || 'es', 'UTC+0');
    let date = datePipe.transform(value, format);
    if (date && deletePoint) {
      date = date?.replaceAll('.', '')
    }
    return <string>date;
  }
}
