import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeZeros',
  pure: true,
})
export class removeZerosPipe implements PipeTransform {
  transform(value: string): string {
    // Check if the value starts with '0' and remove it
    if (value.startsWith('0')) {
      value = value.substring(1);
    }
    const  shortenToDate = (longDate : string) => longDate.split(':')[0];
    return shortenToDate(value);
  }
}
