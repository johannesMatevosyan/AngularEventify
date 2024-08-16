import { Component, OnInit } from '@angular/core';
import { DateTime } from "luxon";
import { EventService, IEvent } from '../event.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  now = DateTime.now();
  startOfWeek = this.now.startOf('week');
  endOfWeek = this.now.endOf('week');
  weekStart = this.startOfWeek.toFormat("ccc, dd");
  weekEnd = this.endOfWeek.toFormat("ccc, dd");
  timeFrame = {
    month: this.startOfWeek.monthLong,
    year: this.now.year
  }
  timeSlots: string[] = [];
  weekDays: { day: string; date: string; }[] = [];
  startTime = 6; // 06:00 AM
  endTime = 19;  // 07:00 PM
  eventGrid: any = [];
  eventsList: IEvent[] = [];
  constructor(private eventService: EventService) {

  }
  ngOnInit(): void {
    this.weekDays = this.getWeekDays(this.startOfWeek);
    this.timeSlots = this.generateTimeSlots(this.startTime, this.endTime);

    this.eventService.getAllEvents().subscribe(events => {
      this.eventsList = events;
      this.eventGrid = this.generateEventGrid();
      console.log(this.eventGrid);
    });
  }
  getToday(): void {
    this.startOfWeek = this.now.startOf('week');
    this.endOfWeek = this.now.endOf('week');
    this.weekStart = this.startOfWeek.toFormat("ccc, dd");
    this.weekEnd = this.endOfWeek.toFormat("ccc, dd");
    // get month name of the current year
    this.timeFrame.year = this.now.year;
    this.timeFrame.month = this.startOfWeek.monthLong;
    // Create an array of dates for the first week of the year
    this.weekDays = this.getWeekDays(this.startOfWeek);
  }
  getWeekChange(event$: 'previous'|'next'): void {
    this.startOfWeek = this.detectWeekChange(event$);
    // get month name of the current year
    this.timeFrame.month = this.checkMonth(this.startOfWeek.monthLong);
    this.timeFrame.year = this.checkYear(this.startOfWeek.year);

    this.endOfWeek = this.startOfWeek.endOf('week');
    this.weekStart = this.startOfWeek.toFormat("ccc, dd");
    this.weekEnd = this.endOfWeek.toFormat("ccc, dd");
    // Create an array of dates for the first week of the year
    this.weekDays = this.getWeekDays(this.startOfWeek);
  }
  detectWeekChange(event$: 'previous'|'next'): DateTime<true> {
    return event$ === 'previous' ? this.startOfWeek.minus({ weeks: 1 }) : this.startOfWeek.plus({ weeks: 1 });
  }
  getFirstOrLastWeek(event$: 'first'|'last'): void {
    // Get the first or last day of the current year
    const resultWeek = event$ === 'last' ? this.now.endOf('year'): this.now.startOf('year');

    // Get the start of the first week that contains the first day of the year
    this.startOfWeek = resultWeek.startOf('week');

    // Get the first or last month name of the the year
    this.timeFrame.month = this.startOfWeek.monthLong;
    this.weekStart = this.startOfWeek.toFormat("ccc, dd");
    this.endOfWeek = this.startOfWeek.endOf('week');
    this.weekEnd = this.endOfWeek.toFormat("ccc, dd");
    // Create an array of dates for the first week of the year
    this.weekDays = this.getWeekDays(this.startOfWeek);
  }

  getWeekDays(data: DateTime<true>): { day: string; date: string; }[] {
    return this.weekDays = Array.from({ length: 7 }, (_, i) =>
      {
        const date = data.plus({ days: i });
        return {
          day: date.toFormat('ccc, dd'),
          date: date.toFormat('yyyy-MM-dd')
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


  generateEventGrid(): any {
    const schedule: any = [];
    this.weekDays.forEach(day => {
      const daySchedule = this.timeSlots.map(time => {
        const event = this.eventsList.find(e => e.date === day.date && e.time === time);
        return { time, event }; // If no event, event will be undefined
      });

      schedule.push({ date: day.date, slots: daySchedule });
    });

    return schedule;
  }

  findEvent(day: any, slot: string): any {
    const foundSlot = day?.slots.find((s: any) => s.time === slot);
    return foundSlot ? foundSlot : [];
  }

  getEventSpan(date: string, time: string): number {
    const event = this.eventsList.find(e => e.date === date && e.time === time);
    if (!event) {
      return 1; // No event at this time, so the cell spans only one row
    }

    // Calculate how many 30-minute slots the event spans
    const startTime = DateTime.fromFormat(`${event.date} ${event.time}`, 'yyyy-MM-dd HH:mm');
    const endTime = DateTime.fromFormat(`${event.date} ${event.endTime}`, 'yyyy-MM-dd HH:mm'); // Assume event has an endTime property

    const duration = endTime.diff(startTime, 'minutes').minutes;
    return Math.ceil(duration / 30)  * 100; // Number of 30-minute slots the event spans multiplayed by 100%
  }
}
