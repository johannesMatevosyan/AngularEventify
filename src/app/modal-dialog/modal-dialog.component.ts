import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import flatpickr from 'flatpickr';
import confirmDatePlugin from 'flatpickr/dist/plugins/confirmDate/confirmDate';
import { IEvent } from '../shared/interfaces/event.interface';
import { EventService } from '../service/event.service';
import { Instance } from 'flatpickr/dist/types/instance';
import { DateTime } from 'luxon';
import { DATE_FORMATS, END_TIME, START_TIME } from '../shared/constants';
import { DeletePopupComponent } from '../delete-popup/delete-popup.component';
import { compareTimes, getEventTime } from '../utils/helpers';

@Component({
  selector: 'app-modal-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DeletePopupComponent],
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModalDialogComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  @ViewChild('deletePopupModal') deletePopupModal!: DeletePopupComponent;
  private flatpickrInstance1!: Instance;
  private flatpickrInstance2!: Instance;
  @ViewChild('start') eventStart!: ElementRef;
  @ViewChild('end') eventEnd!: ElementRef;

  configs = {
    altInput: true,
    altFormat: DATE_FORMATS.CONTINENTAL_TIME,
    enableTime: true,
    dateFormat: DATE_FORMATS.YEAR_MONTH_DAY_TIME,
    minTime: START_TIME,
    maxTime: END_TIME,
    time_24hr: true, // 24-hour Time Picker
    minuteIncrement: 15,
    plugins: [  confirmDatePlugin({
      confirmIcon: "",
      showAlways: true, // Show the confirm button all the time
      theme: "light"
    })]
  }
  eventForm = new FormGroup({
    name: new FormControl('', Validators.required),
    startTime: new FormControl('', Validators.required),
    endTime: new FormControl('', [Validators.required]),
    date: new FormControl(''),
    description: new FormControl(''),
  }, { validators: this.startDateBeforeEndDateValidator() });
  @Input() data: IEvent = {
      id: '',
      name: '',
      startTime: '',
      endTime: '',
      date: '',
      description: '',
  };
  @Input() hideOnEsc: boolean = true;
  @Input() isAmPmFormat: boolean = false;
  dialogTitle: string = '';
  isVisible = false;
  submitted = false;
  showErrors = false;
  showRemoveButton = false;
  constructor(private renderer: Renderer2, private cdr: ChangeDetectorRef, private eventService: EventService) { }

  ngOnInit(): void {
    this.cdr.detectChanges();

    // detect if ESC key button was pressed
    this.renderer.listen('window', 'keyup.esc', () => {
      if (this.hideOnEsc) {
        this.close();
      }
    });

    // Subscribe to form value changes to check for errors
    this.eventForm.valueChanges.subscribe((v) => {
      this.checkForErrors();
    });

  }

  ngOnChanges(): void {
    this.toggleRemoveButton();
    this.setFormData();
  }

  toggleRemoveButton(): void {
    this.showRemoveButton = this.data.id ? true : false;
    this.dialogTitle = this.data.id && this.data.name ? 'Edit Event' : 'Add Event'
    this.cdr.detectChanges();
  }

  setFormData(): void {
    this.cdr.detectChanges();
    this.eventForm.patchValue({
      name: this.data.name?? '',
      date: this.data.date ? this.data.date : '',
      description: this.data.description?? '',
    });

    const startTime = this.data.startTime ? DateTime.fromFormat('17:00', DATE_FORMATS.FULL_DATE) : 0;
    const endTime = this.data.endTime ? DateTime.fromFormat(this.data.endTime, DATE_FORMATS.FULL_DATE) : 0;

    if (!this.eventStart || !this.eventEnd || endTime < startTime || !this.data.date) {
      return;
    }
    this.initializeFlatpickr();
    // set date and time into date picker component
    const dateStr1 = `${this.data.date + ' ' + this.data.startTime}`
    const dateStr2 = `${this.data.date + ' ' + this.data.endTime}`
    if (this.flatpickrInstance1 && this.data.startTime) {
      this.eventForm.patchValue({ startTime: dateStr1 });
      this.flatpickrInstance1.setDate(dateStr1);
    }
    if (this.flatpickrInstance2 && this.data.endTime) {
      this.eventForm.patchValue({ endTime: dateStr2 });
      this.flatpickrInstance2.setDate(dateStr2);
    }
  }

  ngAfterViewInit(): void {
    this.initializeFlatpickr();
    this.cdr.detectChanges(); // Ensure that changes are detected
  }

  initializeFlatpickr(): void {
    if (!this.eventStart || !this.eventEnd) {
      return;
    }
    const configs = {...this.configs};
    configs.time_24hr = this.isAmPmFormat ? false : true;
    configs.altFormat = this.isAmPmFormat ? DATE_FORMATS.AMPM_TIME : DATE_FORMATS.CONTINENTAL_TIME;
    this.flatpickrInstance1 = flatpickr(this.eventStart.nativeElement, {
      ...configs,
      minDate: this.getCurrentDate(),
      onChange: this.onStartDateChange.bind(this)
    });
    this.flatpickrInstance2 = flatpickr(this.eventEnd.nativeElement, configs);
  }

  onStartDateChange(selectedDates: Date[]): void {
    if (selectedDates.length > 0) {
      const jsDate = new Date(selectedDates[0]);
      const luxonDate = DateTime.fromJSDate(jsDate) as DateTime<true>;

      const selectedDate = luxonDate.toFormat(DATE_FORMATS.DEFAULT).split(' ')[0];
      const startTime = luxonDate.toFormat('HH:mm').slice(0, 5)
      // Add 30 minutes to the selected start date
      const eventStartEndTime = getEventTime(luxonDate, startTime);
      const eventEndDate = selectedDate + ' ' + eventStartEndTime.endTime;
      // Update the end date picker
      this.flatpickrInstance2.setDate(eventEndDate);
      this.eventForm.patchValue({ endTime: eventEndDate });
    }
  }

  get eventFormControl() {
    return this.eventForm.controls;
  }

  // Function to check for errors in all controls
  checkForErrors(): void {
    Object.keys(this.eventForm.controls).forEach(key => {
      const control = this.eventForm.get(key);
      if (control && control.invalid && control.touched) {
        console.log(`${key} has error: ${JSON.stringify(control.errors)}`);
      }
    });
    this.submitted = false;
  }

  // Method to check if a control has a specific error
  hasError(controlName: string, errorName: string): boolean | undefined {
    const control = this.eventForm.get(controlName);
    return control?.hasError(errorName) && control.touched;
  }

  resetForm(): void {
    this.eventForm.reset();
    this.markControlsAsUntouched(this.eventForm);
  }

  open(): void {
    this.isVisible = true;
    if (!this.flatpickrInstance1 || !this.flatpickrInstance2) {
      this.initializeFlatpickr();
    }
    this.cdr.detectChanges();
  }

  close(): void {
    this.resetForm();
    this.isVisible = false;
    this.showErrors = false;
  }

  openDeletePopup(id: string): void {
    if (this.deletePopupModal && id) {
      this.deletePopupModal.open();
    }
  }

  confirmEventDelete(data: {eventId: string, eventName: string}): void {
    if (!data || !data.eventId) {
      return;
    }
    this.eventService.deleteEvent(data.eventId, data.eventName).subscribe((isDeleted) => {
      if(isDeleted) {
        this.close();
      }
    });
  }

  getValidString(value: string | null | undefined, defaultValue: string): string {
    return value ? value : defaultValue;
  }

  onSubmit(): void {
    this.submitted = true;
    this.showErrors = true;
    if (this.eventForm.invalid) {
      this.eventForm.markAllAsTouched();
      return;
    }

    const data = {... this.eventForm.value};
    const name = this.getValidString(data.name, 'Default Name');
    const startTime = this.getValidString(data.startTime?.split(' ')[1], '18:00');  // set current time if not provided
    const endTime = this.getValidString(data.endTime?.split(' ')[1], '18:30');      // set current time + 15 minutes if not provided
    const date = this.getValidString(data.startTime?.split(' ')[0], this.getCurrentDate());    // set current date if not provided
    const description = this.getValidString(data.description, '');   // set empty string if not provided

    const validObj: IEvent = {
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

    if(this.data.id) {
      validObj.id = this.data.id;
      this.eventService.updateEvent(validObj).subscribe({
        next: () => {
          this.submitted = false;
          this.close();  // Close modal on successful response
        },
        error: (error: Error) => {
          console.error('Error occurred:', error);
          this.submitted = false;
        },
      });

    } else {
      this.eventService.addEvent(validObj).subscribe({
        next: (result: boolean | IEvent) => {
          if (result === true) {
            this.submitted = false;
            this.close();  // Close modal on successful response
          } else if (typeof result === 'object') {
            this.submitted = false;
            this.close();  // Close modal on successful response
          } else {
            console.log('Failed to add event');
          }
        },
        error: (error: Error) => {
          console.error('Error occurred:', error);
          this.submitted = false;
        },
      });
    }
  }
  // Get the current date and time
  getCurrentDate(): string {
    return DateTime.now().toISODate();
  }

  startDateBeforeEndDateValidator(): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const eventStartDate = group.get('startTime')?.value;
      const eventEndDate = group.get('endTime')?.value;
      const [startDate, startTime] = eventStartDate?.split(' ') || [];
      const [endDate, endTime] = eventEndDate?.split(' ') || [];
      const checkTime = compareTimes(startTime, endTime);
      if (startDate && endDate && startDate !== endDate) {
        return { multiDayEvent: true }; // Error key
      } else if (startTime && endTime && checkTime) {
        return { startTimeBeforeEndTIme: true }; // Error key
      }
      return null; // No error
    };
  }


  deleteEvent(id: string | undefined): void {
    if(!id) {
      return;
    }
    this.openDeletePopup(id);
  }

  ngOnDestroy(): void {
    this.showErrors = false;
    this.showRemoveButton = false;
    this.markControlsAsUntouched(this.eventForm); // This will reset the form and remove the `.touched` state
  }

  private markControlsAsUntouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsUntouched();
    });
  }
}
