import { Component } from '@angular/core';
import { EventService } from './service/event.service';
import { Observable } from 'rxjs';
import { IEvent } from './shared/interfaces/event.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AngularEventify';
  eventsList$: Observable<IEvent[]> = this.eventService.getAllEvents();
  eventAdded$ = this.eventService.eventAdded$;
  constructor(private eventService: EventService) {}

}
