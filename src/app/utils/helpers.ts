import { DateTime } from "luxon"
import { DATE_FORMATS } from "../shared/constants";

export function formatToFullDate(date: string, time: string): DateTime<true | false> {
  return DateTime.fromFormat(`${date} ${time}`, DATE_FORMATS.FULL_DATE);
}

export function formatWeekData(weekData: DateTime<true>): string{
  return weekData.toFormat(DATE_FORMATS.WEEKDAY_FORMAT)
}
