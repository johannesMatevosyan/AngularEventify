import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { WeekChange } from '../../shared/enums/week-change.enum';
import { FistLastWeek } from 'src/app/shared/enums/first-last-week.enum';
import { DateTime } from 'luxon';
import { DATE_FORMATS } from 'src/app/shared/constants';
import { IEvent } from 'src/app/shared/interfaces/event.interface';
import { ModalDialogComponent } from 'src/app/modal-dialog/modal-dialog.component';
import { getEventTime } from 'src/app/utils/helpers';

@Component({
  selector: 'app-calendar-header',
  templateUrl: './calendar-header.component.html',
  styleUrls: ['./calendar-header.component.scss']
})
export class CalendarHeaderComponent {
  @ViewChild('eventModal') eventModal!: ModalDialogComponent;
  @Input() year: number = new Date().getFullYear();
  @Input() monthName: string = new Date(Date.now()).toLocaleString("en-US", { month: "long" });
  @Input() weekStart: string = '';
  @Input() weekEnd: string = '';
  @Input() navigationColor: string = '';
  @Input() todaysDate: string = '';
  @Input() isAmPmFormat: boolean = false;
  @Output() onToday = new EventEmitter<void>();
  @Output() onWeekCHange = new EventEmitter<WeekChange>();
  @Output() onGetFirstOrLastWeek = new EventEmitter<FistLastWeek>();

  FLWeek = FistLastWeek;
  now = DateTime.now();
  currentEvent = {} as IEvent;
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

  addEvent(): void {
    let currentTime = this.now;
    const date = currentTime.toFormat(DATE_FORMATS.FULL_DATE).split(' ')[0];
    // If the current time is greater than 7:30 PM, set the start time to 6:30 PM, otherwise set it to the current time
    const startTime = currentTime.hour >= 19 ? '18:30' : currentTime.toFormat(DATE_FORMATS.FULL_DATE).split(' ')[1];
    const eventDateTime = getEventTime(currentTime, startTime);

    this.currentEvent = {
      date,
      startTime: eventDateTime.startTime,
      endTime: eventDateTime.endTime,
      name: '',
      description: ''
    }
    if (this.eventModal) {
      this.eventModal.open();
    }
  }
}
