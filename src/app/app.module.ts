import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { CalendarComponent } from './calendar/calendar.component';
import { CalendarHeaderComponent } from './calendar/calendar-header/calendar-header.component';
import { EventComponent } from './calendar/event/event.component';
import { ModalDialogComponent } from './modal-dialog/modal-dialog.component';
import { CurrentTimeIndicatorComponent } from './calendar/current-time-indicator/current-time-indicator.component';
import { DisableRightClickDirective } from './directives/disable-right-click.directive';
import { ApplicationPipesModule } from './application-pipes/application-pipes.module';
import { TableHeaderComponent } from './calendar/table-header/table-header.component';

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    CalendarHeaderComponent,
    EventComponent,
    CurrentTimeIndicatorComponent,
    DisableRightClickDirective,
    TableHeaderComponent
  ],
  imports: [
    BrowserModule,
    ModalDialogComponent,
    HttpClientModule,
    ApplicationPipesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
