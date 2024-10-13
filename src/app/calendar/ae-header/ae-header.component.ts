import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { WeekChange } from '../../shared/enums/week-change.enum';
import { FistLastWeek } from '../../shared/enums/first-last-week.enum';
import { DateTime } from 'luxon';
import { DATE_FORMATS } from '../../shared/constants';
import { IEvent } from '../../shared/interfaces/event.interface';
import { ModalDialogComponent } from '../../modal-dialog/modal-dialog.component';
import { getEventTime } from '../../utils/helpers';

@Component({
  selector: 'app-ae-header',
  templateUrl: './ae-header.component.html',
  styleUrls: ['./ae-header.component.scss']
})
export class AeHeaderComponent {
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
