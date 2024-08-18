import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @Input() title: string = '';
  isVisible: boolean = false;

  open(): void {
    this.isVisible = true;
  }

  save(): void {
  }

  close(): void {
    this.isVisible = false;
  }
}
