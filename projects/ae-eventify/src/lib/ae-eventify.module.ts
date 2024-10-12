import { NgModule } from '@angular/core';
import { AeEventifyComponent } from './ae-eventify.component';
import { CalendarHeaderComponent } from './components/calendar-header/calendar-header.component';
import { CommonModule } from '@angular/common';
import { ModalDialogComponent } from './components/modal-dialog/modal-dialog.component';
import { ApplicationPipesModule } from './application-pipes/application-pipes.module';
import { TableHeaderComponent } from './components/table-header/table-header.component';
import { CurrentTimeIndicatorComponent } from './components/current-time-indicator/current-time-indicator.component';
import { EventComponent } from './components/event/event.component';
import { DisableRightClickDirective } from './directives/disable-right-click.directive';



@NgModule({
  declarations: [
    CalendarHeaderComponent,
    AeEventifyComponent,
    TableHeaderComponent,
    CurrentTimeIndicatorComponent,
    EventComponent,
    DisableRightClickDirective
  ],
  imports: [
    CommonModule,
    ModalDialogComponent,
    ApplicationPipesModule
  ],
  exports: [
    AeEventifyComponent
  ]
})
export class AeEventifyModule { }
