import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delete-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-popup.component.html',
  styleUrls: ['./delete-popup.component.scss']
})
export class DeletePopupComponent {
  @Input() id = ''
  @Input() name = ''
  @Output() confirmEventDelete = new EventEmitter<string>();
  isDeletePopupVisible = false;

  open(): void {
    this.isDeletePopupVisible = true;
  }
  close(): void {
    this.isDeletePopupVisible = false;
  }
  deleteEvent(id: string): void {
    this.confirmEventDelete.emit(id);
    this.close();
  }
}
