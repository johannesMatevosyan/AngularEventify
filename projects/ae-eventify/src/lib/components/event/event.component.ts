import { Component, Input } from '@angular/core';
import { DateTime } from 'luxon';
import { COLORS, DATE_FORMATS } from '../../constants';
import { IEventUI } from '../../interfaces/event.interface';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent {
  colors = COLORS;
  @Input() eventSpan: number | null = null;
  @Input() eventUI: IEventUI = {
    eventBackColor: '',
    eventHoverColor: '',
    eventBorderColor: '',
    eventFontColor: '',
  }
  @Input() eventDuration = {
    startTime: '',
    endTime: '',
    date: '',
  }
  @Input() isAmPmFormat: boolean = false;
  isHovered = false;
  _title: string = '';
  _description: string = '';

  @Input()
  get title(): string {
    return this._title;
  }
  set title(name: string) {
    this._title = name[0].toUpperCase() + name.slice(1);
  }
  get eventBackColor(): string {
    return this.eventUI?.eventBackColor || this.colors.PRIMARY;
  }
  get eventHoverColor(): string {
    return this.eventUI?.eventHoverColor || this.colors.PRIMARY_HOVER;
  }
  get eventBorderColor(): string {
    return this.eventUI?.eventBorderColor || this.colors.LIGHT_GREY;
  }
  get eventFontColor(): string {
    return this.eventUI?.eventFontColor || this.colors.WHITE;
  }
  changeDateFormat(date: string): string {
    return DateTime.fromISO(date).toFormat(DATE_FORMATS.WEEKDAY_FORMAT);
  }
}

