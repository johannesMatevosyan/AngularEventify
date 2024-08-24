import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnChanges, OnInit, Renderer2, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import flatpickr from 'flatpickr';
import confirmDatePlugin from 'flatpickr/dist/plugins/confirmDate/confirmDate';
import { IEvent } from '../shared/interfaces/event.interface';
import { EventService } from '../service/event.service';
import { Instance } from 'flatpickr/dist/types/instance';
import { DateTime } from 'luxon';
import { DATE_FORMATS, END_TIME, START_TIME } from '../shared/constants';

@Component({
  selector: 'app-modal-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.scss']
})
export class ModalDialogComponent implements OnInit, AfterViewInit, OnChanges {
  private flatpickrInstance!: Instance;
  @ViewChild('datePickerInput') datePickerInput!: ElementRef;
  @ViewChild('start') eventStart!: ElementRef;
  @ViewChild('end') eventEnd!: ElementRef;

  configs = {
    altInput: true,
    altFormat: "F j, Y H:i",
    enableTime: true,
    dateFormat: 'Y-m-d H:i',
    minTime: START_TIME,
    maxTime: END_TIME,
    time_24hr: true, // 24-hour Time Picker
    minuteIncrement: 15,
    plugins: [  confirmDatePlugin({
      confirmIcon: "",
      showAlways: true,                         // Show the confirm button all the time
      theme: "light"                             // Theme: 'light' or 'dark'
    })]
  }
  eventForm = new FormGroup({
    name: new FormControl(''),
    startTime: new FormControl(''),
    endTime: new FormControl(''),
    date: new FormControl(''),
    description: new FormControl(''),
  });
  @Input() data: IEvent = {
      name: '',
      startTime: '',
      endTime: '',
      date: '',
      description: '',
  };
  @Input() hideOnEsc: boolean = true;
  @Input() title: string = '';
  isVisible: boolean = false;
  constructor(private renderer: Renderer2, private cdr: ChangeDetectorRef, private eventService: EventService) { }

  ngOnInit(): void {
    this.cdr.detectChanges();
    // detect if ESC key button was pressed
    this.renderer.listen('window', 'keyup.esc', () => {
      if (this.hideOnEsc) {
        this.close();
      }
    });
  }

  ngOnChanges(): void {
    this.setFormData();
  }

  setFormData(): void {
    this.cdr.detectChanges();
    this.eventForm.get('name')?.setValue(this.data.name?? null);
    this.eventForm.get('date')?.setValue(this.data.date?? null);
    this.eventForm.get('description')?.setValue(this.data.description?? null);

    const startTime = this.data.startTime ? DateTime.fromFormat(this.data.startTime, DATE_FORMATS.FULL_DATE) : 0;
    const endTime = this.data.endTime ? DateTime.fromFormat(this.data.endTime, DATE_FORMATS.FULL_DATE) : 0;

    if (!this.eventStart || !this.eventEnd || endTime < startTime ) {
      return;
    }

    this.setDateTime(this.eventStart.nativeElement, this.data.startTime);

    this.setDateTime(this.eventEnd.nativeElement, this.data.endTime);
  }

  setDateTime(nativeElement: HTMLElement, time: string): void {
    this.flatpickrInstance = flatpickr(nativeElement, this.configs);
    if (this.flatpickrInstance &&  this.data.date && time) {
      const dateToSet = this.data.date + ' ' + time;
      this.flatpickrInstance.setDate(dateToSet);
    }
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges(); // Ensure that changes are detected
  }

  open(): void {
    this.isVisible = true;
    this.cdr.detectChanges();
  }

  close(): void {
    this.isVisible = false;
  }

  getValidString(value: string | null | undefined, defaultValue: string): string {
    return value ? value : defaultValue;
  }

  onSubmit(): void {

    const data = {... this.eventForm.value};
    data.date = this.eventForm.value.startTime?.split(' ')[0];
    const name = this.getValidString(data.name, 'Default Name');
    const startTime = this.getValidString(data.startTime, '18:30');  // set current time if not provided
    const endTime = this.getValidString(data.endTime, '18:45');     // set current time + 15 minutes if not provided
    const date = this.getValidString(data.date, this.getCurrentDate());           // set current date if not provided
    const description = this.getValidString(data.description, '');

    const validObj = {
      name,
      startTime,
      endTime,
      date,
      description
    }

    if (!validObj) {
      console.warn('Please fill all fields');
      return;
    }

    this.eventService.addEvent(validObj).subscribe((res) => {
      if(res) {
        this.close();
      }
    });
  }

  getCurrentDate(): string {
    // Get the current date and time
    const currentDate = DateTime.now().toISODate();
    return currentDate;
  }
}
