import { Component, Input, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventManager } from '@angular/platform-browser';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() hideOnEsc: boolean = true;
  @Input() title: string = '';
  isVisible: boolean = false;
  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
    // detect if ESC key button was pressed
    this.renderer.listen('window', 'keyup.esc', () => {
      if (this.hideOnEsc) {
        this.close();
      }
    });
  }

  open(): void {
    this.isVisible = true;
  }

  save(): void {
  }

  close(): void {
    this.isVisible = false;
  }
}
