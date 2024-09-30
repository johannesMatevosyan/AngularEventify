import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { DateTime } from "luxon";
import { ModalDialogComponent } from '../modal-dialog/modal-dialog.component';
import { COLORS, DATE_FORMATS, START_TIME, END_TIME } from '../shared/constants';
import { WeekChange } from '../shared/enums/week-change.enum';
import { FistLastWeek } from '../shared/enums/first-last-week.enum';
import { IEvent, IEventUI, ISchedule, IScheduleItem, IWeekDay, schedulerUI, IUrlData } from '../shared/interfaces/event.interface';
import { interval, Subscription } from 'rxjs';
import { EventService } from '../service/event.service';
import { formatToFullDate, formatWeekData, getEventTime, getWeekDays, isCurrentTimeInSlot } from '../utils/helpers';

interface ITimeFrame {
  monthName: string;
  year: number;
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, OnChanges, OnDestroy {
  @ViewChild('eventModal') eventModal!: ModalDialogComponent;
  @Input() schedulerUI: schedulerUI = {
    schedulerBackColor: '',
    schedulerFontColor: '',
    cellColor: '',
    currentDayColor: '',
    currentTimeBarColor: '',
    navigationColor: '',
  };
  @Input() eventUI: IEventUI = {
    eventBackColor: '',
    eventHoverColor: '',
    eventBorderColor: '',
    eventFontColor: '',
  };
  @Input() customClass: string = '';
  @Input() isAmPmFormat: boolean = false;
  @Input() disableRightClick: boolean = false;
  @Input() urlData: IUrlData = {
    baseUrl: '',
    getUrl: '',
    addUrl: '',
    updateUrl: '',
    deleteUrl: ''
  };
  @Input() showReminderData: {
    showEventReminder: boolean,
    showBeforeMinutes: 30 | 60
  } = {
    showEventReminder: false,
    showBeforeMinutes: 30
  };
  @Output() eventCreated: EventEmitter<IEvent> = new EventEmitter();
  @Output() eventCreationFailed: EventEmitter<string> = new EventEmitter();
  @Output() eventDeleted: EventEmitter<string> = new EventEmitter();
  colors = COLORS;
  now = DateTime.now();
  startOfWeek = this.now.startOf('week');
  endOfWeek = this.now.endOf('week');
  weekStart = formatWeekData(this.startOfWeek);
  weekEnd = this.endOfWeek.toFormat(DATE_FORMATS.WEEKDAY_FORMAT);
  timeFrame: ITimeFrame = {
    monthName: this.startOfWeek.monthLong,
    year: this.now.year
  }
  timeSlots: string[] = [];
  weekDays: IWeekDay[] = [];
  startTime = parseInt(START_TIME.split(':')[0]); // 06:00 AM
  endTime = parseInt(END_TIME.split(':')[0]);  // 06:00 PM
  eventGrid: ISchedule[] = [];
  eventsList: IEvent[] = [];
  isToday = false;
  today: string = this.now.toFormat(DATE_FORMATS.FULL_DATE);
  currentEvent = {} as IEvent;
  isModalOpen = false;
  private subscription: Subscription = new Subscription();
  private reminderCheckSubscription: Subscription | null = null;
  constructor(private cdr: ChangeDetectorRef, private eventService: EventService) {
    this.eventService.init(this.urlData);
  }
  get mergedSchColors() {
    return { ...this.schedulerUI };
  }
  // Check if the current time is within a given time slot
  checkIndicatorPosition = isCurrentTimeInSlot
  ngOnChanges(): void {
    this.eventService.init(this.urlData);
  }

  ngOnInit(): void {
    this.weekDays = getWeekDays(this.startOfWeek);
    this.timeSlots = this.generateTimeSlots(this.startTime, this.endTime);
    if (this.urlData?.getUrl) {
      this.subscription = this.eventService.getAllEvents().subscribe({
        next: (events) => {
          this.eventsList = events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
          this.eventGrid = this.generateEventGrid(this.weekDays);
          this.cdr.detectChanges();
        },
        error: (err) => console.error('Error fetching events', err),
        complete: () => console.log('Event fetching complete')
      });
    }

    if (this.showReminderData && this.showReminderData.showEventReminder) {
      this.startReminderCheck();
    }
    this.handleEventSubjects();
  }
  startReminderCheck(): void {
    if (this.reminderCheckSubscription) {
      return; // If already subscribed, do nothing
    }

    // Run the check every minute (300000 ms)
    this.reminderCheckSubscription = interval(300000)  // 300,000 ms = 5 minutes
      .subscribe(() => {
        this.checkForUpcomingEvents();
      });
  }
  checkForUpcomingEvents(): void {
    const now = this.now;
    this.eventGrid.forEach(item => {
      // Check if the event is today
      if (item.date === this.today.split(' ')[0]) {
        // Check if the current time is within the event time slot
        item.slots.forEach(slot => {
          if (slot && slot?.event) {
            const eventName = slot.event.name;
            const [slotHour, slotMinute] = slot.event.startTime.split(':').map(Number);
            const slotStartTime = now.set({ hour: slotHour, minute: slotMinute });
            // Calculate the time 30 minutes before the event start time
            const reminderTime = slotStartTime.minus({ minutes: 30 });

            // Check if the current time is within the last 5 minutes before the reminder time
            if (now >= reminderTime && now < reminderTime.plus({ minutes: 5 })) {
              this.showReminder(eventName || 'Unknown Event', this.showReminderData.showBeforeMinutes);
            }
          }

        });
      }

    });
  }
  showReminder(eventTitle: string, minutes: 30 | 60): void {
    window.alert(`Reminder: The event "${eventTitle}" starts in ${minutes} minutes!`);
  }
  handleEventSubjects(): void {
    this.eventService.eventAdded$.subscribe(isAdded => {
      if(!isAdded) {
        return;
      }
      this.eventGrid = this.generateEventGrid(this.weekDays);
      this.cdr.detectChanges();
    });
    this.eventService.event$.subscribe(event => {
      if (!event) {
        return;
      }
      this.eventCreated.emit(event);
    });
    this.eventService.eventFailure$.subscribe(errorMessage => {
      if (errorMessage) {
        this.eventCreationFailed.emit(errorMessage);
      }
    });
    this.eventService.eventDeletion$.subscribe(deletedEventId => {
      if (deletedEventId) {
        this.eventDeleted.emit(deletedEventId);
      }
    });
  }
  getToday(): void {
    this.startOfWeek = this.now.startOf('week');
    this.endOfWeek = this.now.endOf('week');
    this.weekStart = formatWeekData(this.startOfWeek);
    this.weekEnd = formatWeekData(this.endOfWeek);
    // get month name of the current year
    this.timeFrame.year = this.now.year;
    this.timeFrame.monthName = this.startOfWeek.monthLong;
    // Create an array of dates for the first week of the year
    this.weekDays = getWeekDays(this.startOfWeek);
    this.eventGrid = this.generateEventGrid(this.weekDays);
  }
  getWeekChange(event$: WeekChange): void {
    this.startOfWeek = this.detectWeekChange(event$);
    // get month name of the current year
    this.timeFrame.monthName = this.checkYearMonth('monthName', this.startOfWeek.monthLong);
    this.timeFrame.year = this.checkYearMonth('year', this.startOfWeek.year);

    this.endOfWeek = this.startOfWeek.endOf('week');
    this.weekStart = formatWeekData(this.startOfWeek);
    this.weekEnd = formatWeekData(this.endOfWeek);
    // Create an array of dates for the first week of the year
    this.weekDays = getWeekDays(this.startOfWeek);
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
    this.timeFrame.monthName = this.startOfWeek.monthLong;
    this.weekStart = formatWeekData(this.startOfWeek);
    this.endOfWeek = this.startOfWeek.endOf('week');
    this.weekEnd = formatWeekData(this.endOfWeek);
    // Create an array of dates for the first week of the year
    this.weekDays = getWeekDays(this.startOfWeek);
    this.eventGrid = this.generateEventGrid(this.weekDays);
  }

  checkYearMonth<T extends keyof ITimeFrame>(type: T, value: ITimeFrame[T]): ITimeFrame[T] {
    return this.timeFrame[type] === value ? this.timeFrame[type] : value;
  }

  generateTimeSlots(startTime: number, endTime: number): string[] {
    // Initialize the starting time (06:00 AM)
    let currentTime = this.now;
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
        const event = this.eventsList.find(e => e.date === day.date && e.startTime.trim().normalize() === time.trim().normalize())
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
    const startTime = formatToFullDate(event.date, event.startTime) ;// DateTime.fromFormat(`${event.date} ${event.startTime}`, DATE_FORMATS.FULL_DATE);
    const endTime = formatToFullDate(event.date, event.endTime); // Assume event has an endTime property

    const duration = endTime.diff(startTime, 'minutes').minutes;
    const min30Slot = Math.ceil(duration / 30);
    return duration >= 30 ? min30Slot  * 100 : min30Slot * 50; // Number of 30-minute slots the event spans multiplayed by 100%
  }

  openEvent(ev: Event, event: IEvent | null | undefined): void {
    ev.preventDefault();
    ev.stopPropagation();

    if (event && event.id) {
      this.currentEvent = event;
    }
    if (this.eventModal) {
      this.eventModal.open();
    }
  }

  addEvent(ev: Event, date: string, startTime: string): void {
    ev.preventDefault();
    ev.stopPropagation();

    let currentTime = this.now;
    const eventDateTime = getEventTime(currentTime, startTime);

    this.currentEvent = {
      date: date,
      startTime: eventDateTime.startTime,
      endTime: eventDateTime.endTime,
      name: '',
      description: ''
    }
    if (this.eventModal) {
      this.eventModal.open();
    }
  }

  trackByTimeSlot(index: number, slot: string): number {
    return index + Math.floor(Math.random() * 100); // Assuming each slot has a unique 'time' property
  }

  trackByEvent(index: number, data:ISchedule): number {
    return index + Math.min(Math.max(1000, 0), 100); // Assuming each event has a unique 'id' property
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe(); // Clean up subscription
    if (this.reminderCheckSubscription) {
      this.reminderCheckSubscription.unsubscribe();
    }
  }
}
