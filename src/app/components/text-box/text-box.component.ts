import { Component, OnInit, forwardRef } from '@angular/core';
import { Generic } from '../generic';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-text-box',
  templateUrl: './text-box.component.html',
  styleUrls: ['./text-box.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TextBoxComponent),
    multi: true
  }]
})
export class TextBoxComponent implements OnInit, Generic, ControlValueAccessor {
  id: string;
  label: string;
  type: string;
  value: any='';
  onChange: (_: any) => void;
  onTouched: () => void;
  constructor() { }

  ngOnInit() {
  }
  registerOnChange(fn: any) {
    this.onChange = fn;
  }
  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  writeValue(value: any) {
    if (value) {
      this.value = value;
    }
  }
  setDisabledState(isDisabled: boolean) {
    console.log('disable ', isDisabled);
  }
}
