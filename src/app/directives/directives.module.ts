import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFormDirective } from './dynamic-form.directive';

@NgModule({
  declarations: [DynamicFormDirective],
  imports: [
    CommonModule
  ],
  exports: [DynamicFormDirective]
})
export class DirectivesModule { }
