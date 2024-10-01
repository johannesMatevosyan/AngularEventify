import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';
import { IEvent, IUrlData } from '../shared/interfaces/event.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  public url: string = '';
  public addUrl: string = '';
  public updateUrl: string = '';
  public deleteUrl: string = '';
  errorMessage = 'Request failed. Please try again later.';
  private eventsSubject = new BehaviorSubject<IEvent[]>([]);
  events$: Observable<IEvent[]> = this.eventsSubject.asObservable();
  private eventAddedSubject = new BehaviorSubject<IEvent | null>(null);
  eventAdded$: Observable<IEvent | null> = this.eventAddedSubject.asObservable();
  private eventAddFailureSubject = new BehaviorSubject<string>('');
  eventAddFailure$: Observable<string> = this.eventAddFailureSubject.asObservable();
  private eventUpdatedSubject = new BehaviorSubject<IEvent | null>(null);
  eventUpdated$: Observable<IEvent | null> = this.eventUpdatedSubject.asObservable();
  private eventUpdateFailureSubject = new BehaviorSubject<string>('');
  eventUpdateFailure$: Observable<string> = this.eventUpdateFailureSubject.asObservable();
  private eventDeletionSubject = new BehaviorSubject<{
    name: string,
    id: string
  } | null>(null);
  eventDeletion$: Observable<{
    name: string,
    id: string
  } | null> = this.eventDeletionSubject.asObservable();
  private eventDeleteFailureSubject = new BehaviorSubject<string>('');
  eventDeleteFailed$: Observable<string> = this.eventDeleteFailureSubject.asObservable();

  init(baseUrl: IUrlData ): void {
    this.url = baseUrl.baseUrl + baseUrl.getUrl;
    this.addUrl = baseUrl.baseUrl + baseUrl.addUrl;
    this.updateUrl = baseUrl.baseUrl + baseUrl.updateUrl;
    this.deleteUrl = baseUrl.baseUrl + baseUrl.deleteUrl;
  }

  constructor(private http: HttpClient) { }

  addEvent(newEvent: IEvent): Observable<boolean | IEvent> {
    if (!newEvent || !newEvent.name || !newEvent.startTime || !newEvent.endTime || !newEvent.date) {
      return of(false);
    }

    return this.http.post<IEvent>(`${this.addUrl}`, newEvent).pipe(
      tap(response => {
        if(!response || !response.id) {
          return of(false);
        }
        this.eventAddedSubject.next(response);
        // Update the event list when new event is added
        const currentEvents = this.eventsSubject.value;
        this.eventsSubject.next([...currentEvents, response]);

        return of(true);
      }),
      catchError((error) => {
        // Handle the error inside the pipe
        this.eventAddFailureSubject.next(this.errorMessage);
        return of(false);
      })
    );
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

    return this.http.put<boolean>(`${this.updateUrl}/${updatedEvent.id}/event`, updatedEvent).pipe(
      tap(response => {
        if(!response) {
          return of(false);
        }
        this.eventUpdatedSubject.next(updatedEvent);
        // Update the event list when new event is updated
        const currentEvents = this.eventsSubject.value;
        const updatedEvents = currentEvents.map(event => event.id === updatedEvent.id ? updatedEvent : event);
        this.eventsSubject.next(updatedEvents);
        return of(true);
      }),
      catchError((error) => {
        // Handle the error inside the pipe
        this.eventUpdateFailureSubject.next(this.errorMessage);
        return of(false);
      })
    );
  }

  deleteEvent(eventId: string, name: string): Observable<boolean> {
    if (!eventId) {
      return of(false);
    }

    return this.http.delete<boolean>(`${this.deleteUrl}/${eventId}`).pipe(
      tap(response => {
        if(!response) {
          return of(false);
        }
        this.eventDeletionSubject.next({
          id: eventId,
          name,
        });
        // Update the event list when an event is deleted
        const currentEvents = this.eventsSubject.value;
        const updatedEvents = currentEvents.filter(event => event.id !== eventId);
        this.eventsSubject.next(updatedEvents);
        return of(true);
      }),
      catchError((error) => {
        // Handle the error inside the pipe
        this.eventDeleteFailureSubject.next(this.errorMessage);
        return of(false);
      })
    );
  }

}
