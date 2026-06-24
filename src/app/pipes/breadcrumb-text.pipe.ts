import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'breadcrumbText',
  standalone: true
})
export class BreadcrumbTextPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    if (!value) return value;
    return value[0].toUpperCase() + value.slice(1).replaceAll('-', ' ');
  }

}
