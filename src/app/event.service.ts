import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';


export interface IEvent {
  title: string;
  startTime: string;
  endTime: string;
  date: string;
  description: string;
}

export const EVENTS: IEvent[] = [
  {
    title: "Starting New Year",
    startTime: "10:00",
    endTime: "19:00",
    date: "2024-01-04",
    description: "Preparation for Christmas.",
  },
  {
    title: "First Week of the Year",
    startTime: "06:00",
    endTime: "19:00",
    date: "2024-01-10",
    description: "First Week of the Year",
  },
  {
    title: "Celebrity Meeting",
    startTime: "15:30",
    endTime: "16:30",
    date: "2024-07-16",
    description: "Celebrity Meeting is a meeting of the Celebrity members",
  },
  {
    title: "Staff Meeting",
    startTime: "13:30",
    endTime: "14:00",
    date: "2024-07-27",
    description: "Staff Meeting is a meeting of the Staff members",
  },
  {
    title: "Group Meeting",
    startTime: "13:30",
    endTime: "14:00",
    date: "2024-07-29",
    description: "Group Meeting is a meeting of the Group members",
  },
  {
    title: "Breakfast",
    startTime: "08:00",
    endTime: "10:00",
    date: "2024-08-12",
    description: "Breakfast is the first meal of the day eaten in the morning.",
  },
  {
    title: "Hot Yoga",
    startTime: "08:00",
    endTime: "09:30",
    date: "2024-08-13",
    description: "Hot Yoga is a series of yoga poses done in a heated room. The heat allows for a deeper stretch and helps to detoxify the skin. The room will be heated to 105°F with 40% humidity. Please bring a towel and water and be prepared to sweat.",
  },
  {
    title: "Acro Yoga",
    startTime: "15:00",
    endTime: "18:00",
    date: "2024-08-14",
    description: "Hot Yoga is a series of yoga poses done in a heated room. The heat allows for a deeper stretch and helps to detoxify the skin. The room will be heated to 105°F with 40% humidity. Please bring a towel and water and be prepared to sweat.",
  },
  {
    title: "exercises",
    startTime: "16:00",
    endTime: "16:30",
    date: "2024-08-15",
    description: "exercises is a series of yoga poses done in a heated room. The heat allows for a deeper stretch and helps to detoxify the skin. The room will be heated to 105°F with 40% humidity. Please bring a towel and water and be prepared to sweat.",
  },
  {
    title: "Board Meeting ",
    startTime: "13:00",
    endTime: "14:00",
    date: "2024-08-16",
    description: "Board Meeting is a meeting of the board of directors of an organization, held to discuss various matters.",
  },
  {
    title: "Coding practice",
    startTime: "13:00",
    endTime: "14:00",
    date: "2024-08-16",
    description: "Coding practice is a practice of coding",
  },
  {
    title: "Sunday fun",
    startTime: "08:00",
    endTime: "09:30",
    date: "2024-08-18",
    description: "lorem ipsum",
  },
  {
    title: "Hollyday",
    startTime: "12:00",
    endTime: "14:00",
    date: "2024-08-22",
    description: "Hollyday is a day of festivity or recreation when no work is done.",
  },
  {
    title: "Preparation for Christmas",
    startTime: "10:00",
    endTime: "14:00",
    date: "2024-12-23",
    description: "Preparation for Christmas.",
  },
  {
    title: "Summarize the Year",
    startTime: "10:00",
    endTime: "14:00",
    date: "2024-12-31",
    description: "Summarize the Year",
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
