import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeZeros',
  pure: true,
})
export class removeZerosPipe implements PipeTransform {
  transform(value: string): string {
    const  shortenToDate = (longDate : string) => longDate.split(':')[0];
    return shortenToDate(value);
  }
}
