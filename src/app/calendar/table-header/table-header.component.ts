import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { COLORS } from 'src/app/shared/constants';
import { IWeekDay, schedulerUI } from 'src/app/shared/interfaces/event.interface';

@Component({
  selector: 'app-table-header',
  templateUrl: './table-header.component.html',
  styleUrls: ['./table-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableHeaderComponent {
  @Input() weekDays: IWeekDay[] = [];
  @Input() todaysDate: string = '';
  @Input() mergedSchColors: schedulerUI = {
    schedulerBackColor: '',
    schedulerFontColor: '',
    cellColor: '',
    currentDayColor: '',
    currentTimeBarColor: '',
    navigationColor: '',
  };
  colors = COLORS;
}
