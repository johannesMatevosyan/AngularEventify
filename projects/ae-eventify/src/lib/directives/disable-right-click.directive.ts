import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appDisableRightClick]'
})
export class DisableRightClickDirective {
  @Input() appDisableRightClick: boolean = false;

  @HostListener('contextmenu', ['$event'])
  onRightClick(event: MouseEvent): void {
    if (this.appDisableRightClick) {
      event.preventDefault();
    }
  }

}
