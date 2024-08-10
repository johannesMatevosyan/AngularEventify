import { Component, OnInit } from '@angular/core';
import { DateTime } from "luxon";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  dateTime = DateTime.now();
  weekStart = this.dateTime.startOf('week').toFormat("ccc, dd");
  weekEnd = this.dateTime.endOf('week').toFormat("ccc, dd");
  year = this.dateTime.year;
  ngOnInit(): void {}
}
