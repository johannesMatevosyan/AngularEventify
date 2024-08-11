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
  weekDates: string[] = [];
  ngOnInit(): void {
    this.weekDates = Array.from({ length: 7 }, (_, i) => {
      return this.startOfWeek.plus({ days: i }).toFormat('ccc, dd');
    });
  }
  getToday(event$: string): string {
    return event$
  }
}
