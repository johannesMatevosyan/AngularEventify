import { Component, EventEmitter, Input, Output } from '@angular/core';

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
  @Output() onToday = new EventEmitter<void>();
  @Output() onWeekCHange = new EventEmitter<'previous'|'next'>();
  @Output() onGetFirstOrLastWeek = new EventEmitter<'first'|'last'>();

  getToday(): void {
    this.onToday.emit();
  }

  toPreviousWeek(): void {
    this.onWeekCHange.emit('previous');
  }

  toNextWeek(): void {
    this.onWeekCHange.emit('next');
  }

  getFirstOrLastWeek(value: 'first'|'last'): void {
    this.onGetFirstOrLastWeek.emit(value);
  }
}
