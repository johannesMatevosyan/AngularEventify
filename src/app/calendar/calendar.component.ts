import { Component, OnInit } from '@angular/core';
import { DateTime } from "luxon";

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
  weekDates: string[] = [];
  startHour = 6; // 06:00 AM
  endHour = 19;  // 07:00 PM
  ngOnInit(): void {
    this.weekDates = this.getWeekDates(this.startOfWeek);
    this.timeSlots = this.incrementDailyTime(this.startHour, this.endHour);
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
    this.weekDates = this.getWeekDates(this.startOfWeek);
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
    this.weekDates = this.getWeekDates(this.startOfWeek);
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
    this.weekDates = this.getWeekDates(this.startOfWeek);
  }

  getWeekDates(data: DateTime<true>): string[] {
    return this.weekDates = Array.from({ length: 7 }, (_, i) =>
      data.plus({ days: i }).toFormat('ccc, dd') // Format as desired
    );
  }
  checkMonth(value: string): string{
    return this.timeFrame.month === value ? this.timeFrame.month : value;
  }
  checkYear(value: number): number {
    return this.timeFrame.year === value ? this.timeFrame.year : value;
  }
  incrementDailyTime(startHour: number, endHour: number): string[] {
    // Initialize the starting time (06:00 AM)
    let currentTime = new Date();
    currentTime.setHours(startHour, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds

    const times = [];

    // Loop until the end hour is reached
    while (currentTime.getHours() <= endHour) {
      // Format the current time as HH:mm
      const formattedTime = currentTime.toTimeString().slice(0, 5);
      times.push(formattedTime);

      // Increment the time by one hour
      currentTime.setHours(currentTime.getHours() + 1);
    }

    return times;
  }
}
