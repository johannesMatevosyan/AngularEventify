import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';


export interface IEvent {
  title: string;
  time: string;
  endTime: string;
  date: string;
  desciption: string;
}

export const EVENTS: IEvent[] = [
  {
    title: "Starting New Year",
    time: "10:00",
    endTime: "19:00",
    date: "2024-01-04",
    desciption: "Preparation for Christmas.",
  },
  {
    title: "First Week of the Year",
    time: "06:00",
    endTime: "19:00",
    date: "2024-01-10",
    desciption: "First Week of the Year",
  },
  {
    title: "Celebrity Meeting",
    time: "15:30",
    endTime: "16:30",
    date: "2024-07-16",
    desciption: "Celebrity Meeting is a meeting of the Celebrity members",
  },
  {
    title: "Staff Meeting",
    time: "13:30",
    endTime: "14:00",
    date: "2024-07-27",
    desciption: "Staff Meeting is a meeting of the Staff members",
  },
  {
    title: "Group Meeting",
    time: "13:30",
    endTime: "14:00",
    date: "2024-07-29",
    desciption: "Group Meeting is a meeting of the Group members",
  },
  {
    title: "Breakfast",
    time: "08:00",
    endTime: "10:00",
    date: "2024-08-12",
    desciption: "Breakfast is the first meal of the day eaten in the morning.",
  },
  {
    title: "Hot Yoga",
    time: "08:00",
    endTime: "09:30",
    date: "2024-08-13",
    desciption: "Hot Yoga is a series of yoga poses done in a heated room. The heat allows for a deeper stretch and helps to detoxify the skin. The room will be heated to 105°F with 40% humidity. Please bring a towel and water and be prepared to sweat.",
  },
  {
    title: "Acro Yoga",
    time: "15:00",
    endTime: "18:00",
    date: "2024-08-14",
    desciption: "Hot Yoga is a series of yoga poses done in a heated room. The heat allows for a deeper stretch and helps to detoxify the skin. The room will be heated to 105°F with 40% humidity. Please bring a towel and water and be prepared to sweat.",
  },
  {
    title: "exercises",
    time: "16:00",
    endTime: "16:30",
    date: "2024-08-15",
    desciption: "exercises is a series of yoga poses done in a heated room. The heat allows for a deeper stretch and helps to detoxify the skin. The room will be heated to 105°F with 40% humidity. Please bring a towel and water and be prepared to sweat.",
  },
  {
    title: "Board Meeting ",
    time: "13:00",
    endTime: "14:00",
    date: "2024-08-16",
    desciption: "Board Meeting is a meeting of the board of directors of an organization, held to discuss various matters.",
  },
  {
    title: "Coding practice",
    time: "13:00",
    endTime: "14:00",
    date: "2024-08-16",
    desciption: "Coding practice is a practice of coding",
  },
  {
    title: "Sunday fun",
    time: "08:00",
    endTime: "09:30",
    date: "2024-08-18",
    desciption: "lorem ipsum",
  },
  {
    title: "Hollyday",
    time: "12:00",
    endTime: "14:00",
    date: "2024-08-22",
    desciption: "Hollyday is a day of festivity or recreation when no work is done.",
  },
  {
    title: "Preparation for Christmas",
    time: "10:00",
    endTime: "14:00",
    date: "2024-12-23",
    desciption: "Preparation for Christmas.",
  },
  {
    title: "Summarize the Year",
    time: "10:00",
    endTime: "14:00",
    date: "2024-12-31",
    desciption: "Summarize the Year",
  }
];

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor() { }

  getAllEvents(): Observable<IEvent[]> {
    return of(EVENTS);
  }
}
