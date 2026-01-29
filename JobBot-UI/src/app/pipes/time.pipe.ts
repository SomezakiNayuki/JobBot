import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timePipe'
})
export class TimePipe implements PipeTransform {

  transform(value: [number, number, number, number, number]): string {
    if (!Array.isArray(value) || value.length < 3) {
      return '';
    }
    const [year, month, day] = value;
    return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  }

}
