import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormat',
  pure: true,
})
export class TimeFormatPipe implements PipeTransform {

  transform(time: string): string {
    let [hours, minutes] = time.split(":").map(Number);
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12 || 12; // Convert 0 or 12+ hour to 12-hour format
    return `${hours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
  }

}
