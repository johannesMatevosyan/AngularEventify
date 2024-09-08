import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarComponent } from './calendar/calendar.component';
import { CalendarHeaderComponent } from './calendar/calendar-header/calendar-header.component';
import { EventComponent } from './calendar/event/event.component';
import { removeZerosPipe } from './pipes/remove-leading-zero.pipe';
import { ModalDialogComponent } from './modal-dialog/modal-dialog.component';
import { CurrentTimeIndicatorComponent } from './calendar/current-time-indicator/current-time-indicator.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { TimeFormatPipe } from './pipes/time-format.pipe';
import { DisableRightClickDirective } from './directives/disable-right-click.directive';

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    CalendarHeaderComponent,
    EventComponent,
    removeZerosPipe,
    CurrentTimeIndicatorComponent,
    TimeFormatPipe,
    DisableRightClickDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ModalDialogComponent,
    HttpClientModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
