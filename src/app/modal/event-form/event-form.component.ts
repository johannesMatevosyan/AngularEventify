import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import flatpickr from 'flatpickr';

@Component({
  selector: 'app-event-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent implements AfterViewInit {
  @ViewChild('startDate') startDate!: ElementRef;
  @ViewChild('endDate') endDate!: ElementRef;

  constructor(private cdr: ChangeDetectorRef) { }

  ngAfterViewInit() {
    this.cdr.detectChanges(); // Ensure that changes are detected
    const configs = {
      altInput: true,
      altFormat: "F j, Y H:i",
      enableTime: true,
      dateFormat: 'Y-m-d H:i',
      minTime: "06:00",
      maxTime: "18:30",
      time_24hr: true // 24-hour Time Picker
    }

    if (this.startDate) {
      flatpickr(this.startDate.nativeElement, configs);
    }
    if (this.endDate) {
      flatpickr(this.endDate.nativeElement, configs);
    }
  }
}
