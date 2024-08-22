import { Component, EventEmitter, Input, Output } from '@angular/core';
import { WeekChange } from '../../shared/enums/week-change.enum';
import { FistLastWeek } from 'src/app/shared/enums/first-last-week.enum';

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
  @Output() onWeekCHange = new EventEmitter<WeekChange>();
  @Output() onGetFirstOrLastWeek = new EventEmitter<FistLastWeek>();

  getToday(): void {
    this.onToday.emit();
  }

  toPreviousWeek(): void {
    this.onWeekCHange.emit(WeekChange.PREVOUS);
  }

  toNextWeek(): void {
    this.onWeekCHange.emit(WeekChange.NEXT);
  }

  getFirstOrLastWeek(value: FistLastWeek): void {
    this.onGetFirstOrLastWeek.emit(value);
  }
}
