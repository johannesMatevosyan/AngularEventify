import { Component, Input } from '@angular/core';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-current-time-indicator',
  templateUrl: './current-time-indicator.component.html',
  styleUrls: ['./current-time-indicator.component.scss']
})
export class CurrentTimeIndicatorComponent {
  @Input() currentTime: string = '';
  @Input() dateTime: DateTime<true> = DateTime.now();

    // Calculate the current position of the current time within a given time slot
    calculateCurrentTimePosition(slot: string): number {
      const currentTime = this.dateTime;
      const [slotHour, slotMinute] = slot.split(':').map(Number);

      const slotStartTime = this.dateTime.set({ hour: slotHour, minute: slotMinute });
      const nextSlotTime = slotStartTime.plus({ minutes: 30 });

      const totalMinutesInSlot = nextSlotTime.diff(slotStartTime, 'minutes').minutes;
      const minutesSinceSlotStart = currentTime.diff(slotStartTime, 'minutes').minutes;

      const positionPercentage = (minutesSinceSlotStart / totalMinutesInSlot) * 100;
      return Math.min(Math.max(positionPercentage, 0), 100); // Ensure it stays within bounds
    }
}
