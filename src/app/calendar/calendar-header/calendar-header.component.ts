import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-calendar-header',
  templateUrl: './calendar-header.component.html',
  styleUrls: ['./calendar-header.component.scss']
})
export class CalendarHeaderComponent {
  @Input() year: number = new Date().getFullYear();
  @Input() monthName: string = new Date(Date.now()).toLocaleString("en-US", { month: "long" });
  @Input() weekStart: string = '';
  @Input() weekEnd: string = '';
  @Output() onToday = new EventEmitter<string>();
  @Output() onWeekCHange = new EventEmitter<string>();

  getToday(): string {
    console.log(DateTime.now().toFormat('ccc, dd LLL yyyy'))
    return DateTime.now().toFormat('ccc, dd LLL yyyy');
  }

  toPreviousWeek(): void {
    this.onWeekCHange.emit('previous');
  }

  toNextWeek(): void {
    this.onWeekCHange.emit('next');
  }
}
