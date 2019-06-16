import { Component, OnInit, QueryList, ContentChild, ViewContainerRef, ElementRef, ViewChild, ViewChildren } from '@angular/core';
import { AppServiceService } from './app-service.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { TextBoxComponent } from './components/text-box/text-box.component';
import { DynamicFormDirective } from './directives/dynamic-form.directive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChildren(DynamicFormDirective) textbox!: QueryList<DynamicFormDirective>;
  dynamicForm: any;
  regForm: FormGroup;
  constructor(private service: AppServiceService, private fb: FormBuilder) { }
  ngOnInit() {
    this.regForm = this.fb.group({
      username: ['test'],
      password: ['']
    })
    this.dynamicForm = this.service.generateCompoenetsByMetaData();
  }
  onSubmit(e) {
    console.log(e, this.regForm.getRawValue(), this.textbox);
  }
}
