export interface IWeekDay {
  day: string;
  date: string;
  isToday? : boolean
}

export interface IScheduleItem {
  event: IEvent | undefined,
  time: string
}

export interface ISchedule {
  date: string,
  slots: IScheduleItem[]
}

export interface IEvent {
  id?: string;
  name: string;
  startTime: string;
  endTime: string;
  date: string;
  description: string;
}

export interface eventUI {
  eventBackColor: string,
  eventHoverColor: string,
  eventBorderColor: string,
  eventFontColor: string,
}

export interface schedulerUI {
  schedulerBackColor: string,
  schedulerFontColor: string
  cellColor: string
}

