import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subscription, tap } from 'rxjs';
import { IEvent } from '../shared/interfaces/event.interface';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class EventService {
  public url: string = '';
  private isEventAddedSubject = new BehaviorSubject<boolean>(false);
  eventAdded$: Observable<boolean> = this.isEventAddedSubject.asObservable();
  private eventsSubject = new BehaviorSubject<IEvent[]>([]);
  events$: Observable<IEvent[]> = this.eventsSubject.asObservable();

  init(baseUrl: string): void {
    this.url = baseUrl;
  }

  constructor(private http: HttpClient) { }

  addEvent(newEvent: IEvent, url = ''): Observable<boolean> {
    if (!newEvent || !newEvent.name || !newEvent.startTime || !newEvent.endTime || !newEvent.date) {
      return of(false);
    }
    const currentEvents = this.eventsSubject.value;
    this.eventsSubject.next([...currentEvents, newEvent]);
    this.isEventAddedSubject.next(true);
    return of(true);
  }

  getAllEvents(): Observable<IEvent[]> {
    if (!this.url) {
      return of([] as IEvent[]);
    }
    this.http.get(this.url).subscribe((data) => {
      this.eventsSubject.next(data as IEvent[]);
    });
    return this.events$;
  }

  updateEvent(updatedEvent: IEvent): Observable<boolean> {
    if (!updatedEvent || !updatedEvent.id) {
      return of(false);
    }

    return this.http.put<boolean>(`${this.url}/${updatedEvent.id}/event`, updatedEvent).pipe(
      tap(response => {
        // Update the event list when new event is added/updated
        if(!response) {
          return of(false);
        }
        const currentEvents = this.eventsSubject.value;
        const updatedEvents = currentEvents.map(event => event.id === updatedEvent.id ? updatedEvent : event);
        this.eventsSubject.next(updatedEvents);
        return of(true);
      })
    );
  }

  deleteEvent(eventId: string): Observable<boolean> {
    if (!eventId) {
      return of(false);
    }
    const currentEvents = this.eventsSubject.value;
    const updatedEvents = currentEvents.filter(event => event.id !== eventId);
    this.eventsSubject.next(updatedEvents);
    return of(true);
  }

}
