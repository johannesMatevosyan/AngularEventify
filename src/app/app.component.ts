import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AngularEventify';
  events = [
    {
      name: "Group Meeting",
      start: "13:30",
      end: "14:00",
      date: "2021-07-29",
      day: "Thursday",
      desciption: "Group Meeting is a meeting of the Group members",
    },
    {
      name: "Hot Yoga",
      start: "08:30",
      end: "09:30",
      date: "2024-08-06",
      day: "Monday",
      desciption: "Hot Yoga is a series of yoga poses done in a heated room. The heat allows for a deeper stretch and helps to detoxify the skin. The room will be heated to 105°F with 40% humidity. Please bring a towel and water and be prepared to sweat.",
    },
    {
      name: "Board Meeting",
      start: "08:30",
      end: "09:30",
      date: "2021-08-08",
      day: "Thursday",
      desciption: "Board Meeting is a meeting of the board of directors of an organization, held to discuss various matters.",
    },
    {
      name: "Board Meeting",
      start: "13:30",
      end: "14:00",
      date: "2021-08-12",
      day: "Thursday",
      desciption: "Board Meeting is a meeting of the board of directors of an organization, held to discuss various matters.",
    }
  ];
}
