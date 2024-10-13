import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FistLastWeek } from '../../enums/first-last-week.enum';
import { DateTime } from 'luxon';
import { getEventTime } from '../../helpers';
import { WeekChange } from '../../enums/week-change.enum';
import { DATE_FORMATS } from '../../constants';
import { ModalDialogComponent } from '../modal-dialog/modal-dialog.component';
import { IEvent } from '../../interfaces/event.interface';

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
  @Output() onWeekCHange = new EventEmitter<any>();
  @Output() onGetFirstOrLastWeek = new EventEmitter<any>();

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
