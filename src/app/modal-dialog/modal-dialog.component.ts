import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnChanges, OnInit, Renderer2, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import flatpickr from 'flatpickr';
import confirmDatePlugin from 'flatpickr/dist/plugins/confirmDate/confirmDate';
import { IEvent } from '../shared/interfaces/event.interface';


@Component({
  selector: 'app-modal-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.scss']
})
export class ModalDialogComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild('datePickerInput') datePickerInput!: ElementRef;
  @ViewChild('startDate') startDate!: ElementRef;
  @ViewChild('endDate') endDate!: ElementRef;

  eventForm = new FormGroup({
    name: new FormControl(''),
    startDate: new FormControl(''),
    endDate: new FormControl(''),
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
  constructor(private renderer: Renderer2, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.cdr.detectChanges();
    // detect if ESC key button was pressed
    this.renderer.listen('window', 'keyup.esc', () => {
      if (this.hideOnEsc) {
        this.close();
      }
    });
    this.setFormData();
  }

  ngOnChanges(): void {
    this.setFormData();
  }

  setFormData(): void {
    this.cdr.detectChanges();
    this.eventForm.setValue({
      name: this.data.name?? null,
      startDate: this.data.startTime?? null,
      endDate: this.data.endTime?? null,
      description: this.data.description?? null,
    });
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges(); // Ensure that changes are detected
    const configs = {
      altInput: true,
      altFormat: "F j, Y H:i",
      enableTime: true,
      dateFormat: 'Y-m-d H:i',
      minTime: "06:00",
      maxTime: "18:30",
      time_24hr: true, // 24-hour Time Picker
      minuteIncrement: 15,
      plugins: [  confirmDatePlugin({
        confirmIcon: "",
        showAlways: true,                         // Show the confirm button all the time
        theme: "light"                             // Theme: 'light' or 'dark'
      })]
    }

    if (this.startDate) {
      flatpickr(this.startDate.nativeElement, configs);
    }
    if (this.endDate) {
      flatpickr(this.endDate.nativeElement, configs);
    }
  }

  open(): void {
    this.isVisible = true;
  }

  close(): void {
    this.isVisible = false;
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn('onSubmit ', this.eventForm.value);
  }
}
