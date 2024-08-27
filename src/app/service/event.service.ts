import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { IEvent } from '../shared/interfaces/event.interface';

export const EVENTS: IEvent[] = [
  {
    id: "1",
    name: "Starting New Year",
    startTime: "10:00",
    endTime: "19:00",
    date: "2024-01-04",
    description: "Preparation for Christmas.",
  },
  {
    id: "2",
    name: "First Week of the Year",
    startTime: "06:00",
    endTime: "19:00",
    date: "2024-01-10",
    description: "First Week of the Year",
  },
  {
    id: "3",
    name: "Celebrity Meeting",
    startTime: "15:30",
    endTime: "16:30",
    date: "2024-07-16",
    description: "Celebrity Meeting is a meeting of the Celebrity members",
  },
  {
    id: "4",
    name: "Staff Meeting",
    startTime: "13:30",
    endTime: "14:00",
    date: "2024-07-27",
    description: "Staff Meeting is a meeting of the Staff members",
  },
  {
    id: "5",
    name: "Group Meeting",
    startTime: "13:30",
    endTime: "14:00",
    date: "2024-07-29",
    description: "Group Meeting is a meeting of the Group members",
  },
  {
    id: "6",
    name: "Breakfast",
    startTime: "08:00",
    endTime: "10:00",
    date: "2024-08-12",
    description: "Breakfast is the first meal of the day eaten in the morning.",
  },
  {
    id: "7",
    name: "Hot Yoga",
    startTime: "08:00",
    endTime: "09:30",
    date: "2024-08-13",
    description: "Hot Yoga is a series of yoga poses done in a heated room. The heat allows for a deeper stretch and helps to detoxify the skin. The room will be heated to 105°F with 40% humidity. Please bring a towel and water and be prepared to sweat.",
  },
  {
    id: "8",
    name: "Acro Yoga",
    startTime: "15:00",
    endTime: "18:00",
    date: "2024-08-14",
    description: "Hot Yoga is a series of yoga poses done in a heated room. The heat allows for a deeper stretch and helps to detoxify the skin. The room will be heated to 105°F with 40% humidity. Please bring a towel and water and be prepared to sweat.",
  },
  {
    id: "9",
    name: "exercises",
    startTime: "16:00",
    endTime: "16:30",
    date: "2024-08-15",
    description: "exercises is a series of yoga poses done in a heated room. The heat allows for a deeper stretch and helps to detoxify the skin. The room will be heated to 105°F with 40% humidity. Please bring a towel and water and be prepared to sweat.",
  },
  {
    id: "10",
    name: "Board meeting ",
    startTime: "13:00",
    endTime: "14:00",
    date: "2024-08-16",
    description: "Board Meeting is a meeting of the board of directors of an organization, held to discuss various matters.",
  },
  {
    id: "11",
    name: "Coding practice",
    startTime: "13:00",
    endTime: "14:00",
    date: "2024-08-16",
    description: "Coding practice is a practice of coding",
  },
  {
    id: "12",
    name: "Sunday fun",
    startTime: "08:00",
    endTime: "09:30",
    date: "2024-08-18",
    description: "lorem ipsum",
  },
  {
    id: "13",
    name: "Sunday fun",
    startTime: "18:30",
    endTime: "19:00",
    date: "2024-08-18",
    description: "lorem ipsum",
  },
  {
    id: "14",
    name: "Hollyday",
    startTime: "12:00",
    endTime: "14:00",
    date: "2024-08-22",
    description: "Hollyday is a day of festivity or recreation when no work is done.",
  },
  {
    id: "141",
    name: "Overlapping Meeting",
    startTime: "13:00",
    endTime: "15:00",
    date: "2024-08-22",
    description: "Overlapping Meeting",
  },
  {
    id: "15",
    name: "long evning",
    startTime: "18:00",
    endTime: "19:00",
    date: "2024-08-22",
    description: "Long evning to work.",
  },
  {
    id: "151",
    name: "15 minute meeting",
    startTime: "12:00",
    endTime: "12:15",
    date: "2024-08-23",
    description: "15 minute meeting",
  },
  {
    id: "152",
    name: "15 minute meeting",
    startTime: "14:00",
    endTime: "14:15",
    date: "2024-08-23",
    description: "15 minute meeting",
  },
  {
    id: "16",
    name: "day lunch",
    startTime: "14:00",
    endTime: "14:30",
    date: "2024-08-21",
    description: "day lunch to rest.",
  },
  {
    id: "17",
    name: 'Team Standup Meeting',
    description: 'Daily standup with the team to discuss project progress.',
    date: '2024-08-27',
    startTime: '09:00',
    endTime: '09:30'
  },
  {
    id: "18",
    name: 'Client Presentation',
    description: 'Present the project deliverables to the client.',
    date: '2024-08-28',
    startTime: '14:00',
    endTime: '15:00'
  },
  {
    id: "181",
    name: 'Human design',
    description: 'Human design for the client.',
    date: '2024-08-29',
    startTime: '11:00',
    endTime: '13:00'
  },
  {
    id: "182",
    name: 'UX meeting',
    description: 'UX meeting.',
    date: '2024-08-31',
    startTime: '16:00',
    endTime: '17:00'
  },
  {
    id: "19",
    name: 'Design Review',
    description: 'Review the design with the UI/UX team.',
    date: '2024-09-03',
    startTime: '11:00',
    endTime: '12:00'
  },
  {
    id: "191",
    name: 'Design Review',
    description: 'Review the design with the UI/UX team.',
    date: '2024-09-05',
    startTime: '11:30',
    endTime: '12:30'
  },
  {
    id: "192",
    name: 'UI meetup',
    description: 'UI meetup',
    date: '2024-09-06',
    startTime: '08:30',
    endTime: '11:30'
  },
  {
    id: "20",
    name: 'Marketing Strategy Meeting',
    description: 'Plan the marketing strategy for the upcoming quarter.',
    date: '2024-09-10',
    startTime: '10:00',
    endTime: '11:30'
  },
  {
    id:  "21",
    name: 'Development Sprint Planning',
    description: 'Plan the tasks for the upcoming development sprint.',
    date: '2024-09-15',
    startTime: '13:00',
    endTime: '14:30'
  },
  {
    id:  "22",
    name: 'Code Review Session',
    description: 'Review the code changes with the development team.',
    date: '2024-09-22',
    startTime: '15:00',
    endTime: '16:30'
  },
  {
    id: "23",
    name: 'Project Retrospective',
    description: 'Reflect on the last sprint and identify areas for improvement.',
    date: '2024-09-30',
    startTime: '10:00',
    endTime: '11:00'
  },
  {
    id: "24",
    name: 'Product Launch Meeting',
    description: 'Discuss the launch plan for the new product.',
    date: '2024-10-05',
    startTime: '14:00',
    endTime: '15:00'
  },
  {
    id: "25",
    name: 'Customer Feedback Session',
    description: 'Gather feedback from customers about the recent release.',
    date: '2024-10-12',
    startTime: '11:00',
    endTime: '12:00'
  },
  {
    id: "26",
    name: 'End-of-Quarter Review',
    description: 'Review the achievements and challenges faced during the quarter.',
    date: '2024-10-20',
    startTime: '09:30',
    endTime: '11:00'
  },
  {
    id: "27",
    name: "Preparation for Christmas",
    startTime: "10:00",
    endTime: "14:00",
    date: "2024-12-23",
    description: "Preparation for Christmas.",
  },
  {
    id: "28",
    name: "Summarize the Year",
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
  private isEventAddedSubject = new BehaviorSubject<boolean>(false);
  eventAdded$: Observable<boolean> = this.isEventAddedSubject.asObservable();
  private eventsSubject = new BehaviorSubject<IEvent[]>(EVENTS);
  events$: Observable<IEvent[]> = this.eventsSubject.asObservable();
  constructor() { }
  // get the list of all available events
  getAllEvents(): Observable<IEvent[]> {
    return this.events$;
  }

  addEvent(newEvent: IEvent): Observable<boolean> {
    if (!newEvent || !newEvent.name || !newEvent.startTime || !newEvent.endTime || !newEvent.date) {
      return of(false);
    }
    const currentEvents = this.eventsSubject.value;
    this.eventsSubject.next([...currentEvents, newEvent]);
    this.isEventAddedSubject.next(true);
    return of(true);
  }
}
