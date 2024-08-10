import { Component, Input } from '@angular/core';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-calendar-header',
  templateUrl: './calendar-header.component.html',
  styleUrls: ['./calendar-header.component.scss']
})
export class CalendarHeaderComponent {
  @Input() year: number = new Date().getFullYear();
  @Input() weekStart: string = '';
  @Input() weekEnd: string = '';
}
