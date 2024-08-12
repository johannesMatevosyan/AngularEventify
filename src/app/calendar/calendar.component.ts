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
  year = this.now.year;
  monthName = this.startOfWeek.monthLong;
  weekDates: string[] = [];
  ngOnInit(): void {

    this.weekDates = Array.from({ length: 7 }, (_, i) => {
      return this.startOfWeek.plus({ days: i }).toFormat('ccc, dd');
    });
  }
  getToday(): void {
    this.startOfWeek = this.now.startOf('week');
    this.endOfWeek = this.now.endOf('week');
    this.weekStart = this.startOfWeek.toFormat("ccc, dd");
    this.weekEnd = this.endOfWeek.toFormat("ccc, dd");
    this.year = this.now.year;
    this.monthName = this.startOfWeek.monthLong;
    this.weekDates = Array.from({ length: 7 }, (_, i) => {
      return this.startOfWeek.plus({ days: i }).toFormat('ccc, dd');
    });
  }
  getWeekChange(event$: string): void {
    this.startOfWeek = event$ === 'previous' ? this.startOfWeek.minus({ weeks: 1 }) : this.startOfWeek.plus({ weeks: 1 });
    this.monthName = this.monthName === this.startOfWeek.monthLong ? this.monthName : this.startOfWeek.monthLong ;
    this.year = this.year === this.startOfWeek.year ? this.year : this.startOfWeek.year;
    this.endOfWeek = this.startOfWeek.endOf('week');
    this.weekStart = this.startOfWeek.toFormat("ccc, dd");
    this.weekEnd = this.endOfWeek.toFormat("ccc, dd");
    this.weekDates = Array.from({ length: 7 }, (_, i) =>
      this.startOfWeek.plus({ days: i }).toFormat('ccc, dd')
    );
  }
  getFirstOrLastWeek(event$: 'first'|'last'): void {
    // Get the first or last day of the current year
    const resultWeek = event$ === 'last' ? this.now.endOf('year'): this.now.startOf('year');

    // Get the start of the first week that contains the first day of the year
    this.startOfWeek = resultWeek.startOf('week');

    // Get the first or last month name of the the year
    this.monthName = this.startOfWeek.monthLong;
    this.weekStart = this.startOfWeek.toFormat("ccc, dd");
    this.endOfWeek = this.startOfWeek.endOf('week');
    this.weekEnd = this.endOfWeek.toFormat("ccc, dd");
    // Create an array of dates for the first week of the year
    this.weekDates = Array.from({ length: 7 }, (_, i) =>
      this.startOfWeek.plus({ days: i }).toFormat('ccc, dd') // Format as desired
    );
  }
}