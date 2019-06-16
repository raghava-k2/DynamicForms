import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextBoxComponent } from './text-box/text-box.component';

@NgModule({
  declarations: [TextBoxComponent],
  entryComponents: [TextBoxComponent],
  imports: [
    CommonModule,
  ],
  exports: [TextBoxComponent]
})
export class ComponentsModule { }
