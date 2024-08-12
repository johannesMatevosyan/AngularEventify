import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarComponent } from './calendar/calendar.component';
import { CalendarHeaderComponent } from './calendar/calendar-header/calendar-header.component';
import { EventComponent } from './calendar/event/event.component';
import { removeZerosPipe } from './pipes/remove-leading-zero.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    CalendarHeaderComponent,
    EventComponent,
    removeZerosPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
