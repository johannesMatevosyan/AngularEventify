import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarComponent } from './calendar/calendar.component';
import { CalendarHeaderComponent } from './calendar/calendar-header/calendar-header.component';
import { EventComponent } from './calendar/event/event.component';
import { removeZerosPipe } from './pipes/remove-leading-zero.pipe';
import { ModalDialogComponent } from './modal-dialog/modal-dialog.component';
import { CurrentTimeIndicatorComponent } from './calendar/current-time-indicator/current-time-indicator.component';
import { TimeFormatPipe } from './pipes/time-format.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    CalendarHeaderComponent,
    EventComponent,
    removeZerosPipe,
    CurrentTimeIndicatorComponent,
    TimeFormatPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ModalDialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
