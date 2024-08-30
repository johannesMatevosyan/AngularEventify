import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
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

@Component({
  selector: 'app-modal-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DeletePopupComponent],
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.scss'],
})
export class ModalDialogComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  @ViewChild('deletePopupModal') deletePopupModal!: DeletePopupComponent;
  private flatpickrInstance1!: Instance;
  private flatpickrInstance2!: Instance;
  @ViewChild('start') eventStart!: ElementRef;
  @ViewChild('end') eventEnd!: ElementRef;

  configs = {
    altInput: true,
    altFormat: "F j, Y H:i",
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
  @Input() title: string = '';

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
    if(this.data.id) {
      this.showRemoveButton = true;
    } else {
      this.showRemoveButton = false;
    }
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
    this.detectPickerOnChange();
    this.cdr.detectChanges(); // Ensure that changes are detected
  }

  initializeFlatpickr(): void {
    if (!this.eventStart || !this.eventEnd) {
      return;
    }
    this.flatpickrInstance1 = flatpickr(this.eventStart.nativeElement, this.configs);
    this.flatpickrInstance2 = flatpickr(this.eventEnd.nativeElement, this.configs);
  }

  detectPickerOnChange(): void{
    flatpickr('#startDate', {
      enableTime: true,
      onChange: (selectedDates, dateStr: string | undefined, instance) => {
        if (dateStr) {
          this.eventForm.get('startDate')?.setValue(dateStr as never); // TODO fix this
          const endDatePicker = flatpickr('#endDate') as flatpickr.Instance;
          const minDate = new Date(dateStr); // Convert string to Date object
          endDatePicker.set('minDate', minDate);
        }
      }
    });

    flatpickr('#endDate', {
      enableTime: true,
      onChange: (selectedDates, dateStr, instance) => {
        this.eventForm.get('endDate')?.setValue(dateStr as never); // TODO fix this
      }
    });
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
    if (this.deletePopupModal) {
      this.deletePopupModal.open();
    }
  }

  confirmEventDelete(eventId: string): void {
    if (!eventId) {
      return;
    }
    this.eventService.deleteEvent(eventId).subscribe((res) => {
      if(res) {
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
    const startTime = this.getValidString(data.startTime?.split(' ')[1], '18:30');  // set current time if not provided
    const endTime = this.getValidString(data.endTime?.split(' ')[1], '18:45');      // set current time + 15 minutes if not provided
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
      this.eventService.updateEvent(validObj).subscribe((res) => {
        if(res) { this.close();}
      });
    } else {
      this.eventService.addEvent(validObj).subscribe((res) => {
        if(res) { this.close();}
      });
    }
  }
  // Get the current date and time
  getCurrentDate(): string {
    return DateTime.now().toISODate();
  }

  startDateBeforeEndDateValidator(): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const startTime = group.get('startTime')?.value;
      const endTime = group.get('endTime')?.value;
      if (startTime && endTime && startTime >= endTime) {
        return { startDateBeforeEndDate: true }; // Error key
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
