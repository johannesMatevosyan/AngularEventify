import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';


export interface IEvent {
  name: string;
  start: string;
  end: string;
  date: string;
  day: string;
  desciption: string;
}

export const EVENTS: IEvent[] = [
  {
    name: "Group Meeting",
    start: "13:30",
    end: "14:00",
    date: "2024-07-29",
    day: "Thursday",
    desciption: "Group Meeting is a meeting of the Group members",
  },
  {
    name: "Board Meeting",
    start: "08:30",
    end: "09:30",
    date: "2024-08-04",
    day: "Thursday",
    desciption: "Board Meeting is a meeting of the board of directors of an organization, held to discuss various matters.",
  },
  {
    name: "Hot Yoga",
    start: "08:00",
    end: "09:30",
    date: "2024-08-12",
    day: "Monday",
    desciption: "Hot Yoga is a series of yoga poses done in a heated room. The heat allows for a deeper stretch and helps to detoxify the skin. The room will be heated to 105°F with 40% humidity. Please bring a towel and water and be prepared to sweat.",
  },
  {
    name: "Board Meeting",
    start: "13:30",
    end: "14:00",
    date: "2024-08-16",
    day: "Thursday",
    desciption: "Board Meeting is a meeting of the board of directors of an organization, held to discuss various matters.",
  },
  {
    name: "Hollyday",
    start: "12:00",
    end: "14:00",
    date: "2024-08-22",
    day: "Thursday",
    desciption: "Board Meeting is a meeting of the board of directors of an organization, held to discuss various matters.",
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
