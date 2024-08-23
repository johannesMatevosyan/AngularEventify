import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DateTime } from "luxon";
import { EventService } from '../service/event.service';
import { ModalDialogComponent } from '../modal-dialog/modal-dialog.component';
import { DATE_FORMATS } from '../shared/constants';
import { WeekChange } from '../shared/enums/week-change.enum';
import { FistLastWeek } from '../shared/enums/first-last-week.enum';
import { IEvent, ISchedule, IScheduleItem, IWeekDay } from '../shared/interfaces/event.interface';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  @ViewChild('eventModal') eventModal!: ModalDialogComponent;
  @Input() schedulerBackColor: string = '#ffffff';
  @Input() schedulerFontColor: string = '#000000e5';
  @Input() eventBackColor: string = '';
  @Input() eventHoverColor: string = '';
  @Input() eventBorderColor: string = '';
  @Input() eventFontColor: string = '';
  @Input() titleColor: string = '#ffffff';
  @Input() currentDayColor: string = '#ff0000';
  @Input() currentTimeBarColor: string = '#ff0000';
  @Input() customClass: string = '';

  now = DateTime.now();
  startOfWeek = this.now.startOf('week');
  endOfWeek = this.now.endOf('week');
  weekStart = this.startOfWeek.toFormat(DATE_FORMATS.WEEKDAY_FORMAT);
  weekEnd = this.endOfWeek.toFormat(DATE_FORMATS.WEEKDAY_FORMAT);
  timeFrame = {
    month: this.startOfWeek.monthLong,
    year: this.now.year
  }
  timeSlots: string[] = [];
  weekDays: IWeekDay[] = [];
  startTime = 6; // 06:00 AM
  endTime = 18;  // 07:00 PM
  eventGrid: ISchedule[] = [];
  eventsList: IEvent[] = [];
  isToday = false;
  today: string = this.now.toFormat(DATE_FORMATS.FULL_DATE);
  dialogTitle: string  = ''
  currentEvent = {} as IEvent;
  isModalOpen = false;
  constructor(private eventService: EventService) {

  }
  ngOnInit(): void {
    this.weekDays = this.getWeekDays(this.startOfWeek);
    this.timeSlots = this.generateTimeSlots(this.startTime, this.endTime);

    this.eventService.getAllEvents().subscribe(events => {
      this.eventsList = events;
      this.eventGrid = this.generateEventGrid(this.weekDays);
    });

  }
  getToday(): void {
    this.startOfWeek = this.now.startOf('week');
    this.endOfWeek = this.now.endOf('week');
    this.weekStart = this.startOfWeek.toFormat(DATE_FORMATS.WEEKDAY_FORMAT);
    this.weekEnd = this.endOfWeek.toFormat(DATE_FORMATS.WEEKDAY_FORMAT);
    // get month name of the current year
    this.timeFrame.year = this.now.year;
    this.timeFrame.month = this.startOfWeek.monthLong;
    // Create an array of dates for the first week of the year
    this.weekDays = this.getWeekDays(this.startOfWeek);
    this.eventGrid = this.generateEventGrid(this.weekDays);
  }
  getWeekChange(event$: WeekChange): void {
    this.startOfWeek = this.detectWeekChange(event$);
    // get month name of the current year
    this.timeFrame.month = this.checkMonth(this.startOfWeek.monthLong);
    this.timeFrame.year = this.checkYear(this.startOfWeek.year);

    this.endOfWeek = this.startOfWeek.endOf('week');
    this.weekStart = this.startOfWeek.toFormat(DATE_FORMATS.WEEKDAY_FORMAT);
    this.weekEnd = this.endOfWeek.toFormat(DATE_FORMATS.WEEKDAY_FORMAT);
    // Create an array of dates for the first week of the year
    this.weekDays = this.getWeekDays(this.startOfWeek);
    this.eventGrid = this.generateEventGrid(this.weekDays);
  }
  detectWeekChange(event$: WeekChange): DateTime<true> {
    return event$ === WeekChange.PREVOUS ? this.startOfWeek.minus({ weeks: 1 }) : this.startOfWeek.plus({ weeks: 1 });
  }
  getFirstOrLastWeek(event$: FistLastWeek): void {
    // Get the first or last day of the current year
    const resultWeek = event$ === FistLastWeek.LAST? this.now.endOf('year'): this.now.startOf('year');

    // Get the start of the first week that contains the first day of the year
    this.startOfWeek = resultWeek.startOf('week');

    // Get the first or last month name of the the year
    this.timeFrame.month = this.startOfWeek.monthLong;
    this.weekStart = this.startOfWeek.toFormat(DATE_FORMATS.WEEKDAY_FORMAT);
    this.endOfWeek = this.startOfWeek.endOf('week');
    this.weekEnd = this.endOfWeek.toFormat(DATE_FORMATS.WEEKDAY_FORMAT);
    // Create an array of dates for the first week of the year
    this.weekDays = this.getWeekDays(this.startOfWeek);
    this.eventGrid = this.generateEventGrid(this.weekDays);
  }

  getWeekDays(data: DateTime<true>): IWeekDay[] {
    return Array.from({ length: 7 }, (_, i) =>
      {
        const date = data.plus({ days: i });
        return {
          day: date.toFormat(DATE_FORMATS.WEEKDAY_FORMAT),
          date: date.toFormat(DATE_FORMATS.DEFAULT),
        };
      }
    );
  }
  checkMonth(value: string): string{
    return this.timeFrame.month === value ? this.timeFrame.month : value;
  }
  checkYear(value: number): number {
    return this.timeFrame.year === value ? this.timeFrame.year : value;
  }
  generateTimeSlots(startTime: number, endTime: number): string[] {
    // Initialize the starting time (06:00 AM)
    let currentTime = DateTime.now();
    currentTime = currentTime.set({ hour: startTime, minute: 0, second: 0 });
    const times: string[] = [];
    while (currentTime.hour <= endTime) {
      // Format the current time as HH:mm
      const formattedTime = currentTime.toFormat('HH:mm').slice(0, 5);

      times.push(formattedTime);
      // Increment the time by one hour
      currentTime = currentTime.plus({ minutes: 30 });
    }

    return times;
  }


  generateEventGrid(weekDays: IWeekDay[]): ISchedule[] {
    const schedule: ISchedule[] = [];
    weekDays.forEach(day => {
      const daySchedule: IScheduleItem[] = this.timeSlots.map(time => {
        const event = this.eventsList.find(e => e.date === day.date && e.startTime === time);
        return { time, event }; // If no event, event will be undefined
      });

      schedule.push({ date: day.date, slots: daySchedule });
    });
    return schedule;
  }

  findEvent(day: ISchedule, slot: string): IScheduleItem | null {
    const foundSlot: IScheduleItem | undefined = day?.slots.find((s: IScheduleItem) => s.time === slot);
    return foundSlot ? foundSlot : null;
  }

  getEventSpan(date: string, time: string): number {
    const event = this.eventsList.find(e => e.date === date && e.startTime === time);
    if (!event) {
      return 1; // No event at this time, so the cell spans only one row
    }

    // Calculate how many 30-minute slots the event spans
    const startTime = DateTime.fromFormat(`${event.date} ${event.startTime}`, DATE_FORMATS.FULL_DATE);
    const endTime = DateTime.fromFormat(`${event.date} ${event.endTime}`, DATE_FORMATS.FULL_DATE); // Assume event has an endTime property

    const duration = endTime.diff(startTime, 'minutes').minutes;
    const min30Slot = Math.ceil(duration / 30);
    return duration >= 30 ? min30Slot  * 100 : min30Slot * 50; // Number of 30-minute slots the event spans multiplayed by 100%
  }
  // Check if the current time is within a given time slot
  isCurrentTimeInSlot(slot: string): boolean {
    const currentTime = DateTime.now();
    const [slotHour, slotMinute] = slot.split(':').map(Number);

    const slotStartTime = DateTime.now().set({ hour: slotHour, minute: slotMinute });
    const nextSlotTime = slotStartTime.plus({ minutes: 30 });

    return currentTime >= slotStartTime && currentTime < nextSlotTime;
  }

  openModal(ev: Event, event: IEvent | null | undefined): void {
    ev.preventDefault();
    ev.stopPropagation();
    if (event && event.id) {
      this.dialogTitle = 'Edit Event'
      this.currentEvent = event;
    } else {
      this.dialogTitle = 'Add Event';
      this.currentEvent = {} as IEvent;
    }

    if (this.eventModal) {
      this.eventModal.open();
    }
  }

}
