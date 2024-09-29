import { DateTime } from "luxon"
import { DATE_FORMATS } from "../shared/constants";
import { IWeekDay } from "../shared/interfaces/event.interface";

export function formatToFullDate(date: string, time: string): DateTime<true | false> {
  return DateTime.fromFormat(`${date} ${time}`, DATE_FORMATS.FULL_DATE);
}

export function formatWeekData(weekData: DateTime<true>): string {
  return weekData.toFormat(DATE_FORMATS.WEEKDAY_FORMAT)
}

export function getWeekDays(data: DateTime<true>): IWeekDay[] {
  return Array.from({ length: 7 }, (_, i) =>
    {
      const date = data.plus({ days: i });
      return {
        day: date.toFormat(DATE_FORMATS.WEEKDAY_FORMAT),
        date: date.toFormat(DATE_FORMATS.DEFAULT),
      };
    }
  );
}

export function isCurrentTimeInSlot(slot: string): boolean {
  const currentTime = DateTime.now();
  const [slotHour, slotMinute] = slot.split(':').map(Number);

  const slotStartTime = currentTime.set({ hour: slotHour, minute: slotMinute });
  const nextSlotTime = slotStartTime.plus({ minutes: 30 });

  return currentTime >= slotStartTime && currentTime < nextSlotTime;
}

export function getEventTime(currentTime: DateTime<true>, startTime: string): { startTime: string, endTime: string } {

  const timeNumber = parseInt(startTime.split(':')[0])
  const minutes = parseInt(startTime.split(':')[1]) === 0 ? 0 : 30;
  const endTime = currentTime
    .set({ hour: timeNumber, minute: minutes, second: 0 })
    .plus({ minutes: 30 }).toFormat('HH:mm');

  return {
    startTime,
    endTime
  }
}
