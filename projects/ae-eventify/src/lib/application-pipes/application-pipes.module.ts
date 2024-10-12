import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeFormatPipe } from './pipes/time-format.pipe';
import { removeZerosPipe } from './pipes/remove-leading-zero.pipe';

@NgModule({
  declarations: [
    TimeFormatPipe,
    removeZerosPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TimeFormatPipe,
    removeZerosPipe
  ]
})
export class ApplicationPipesModule { }
