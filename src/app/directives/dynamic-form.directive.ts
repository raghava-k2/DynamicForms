import { Directive, ComponentFactoryResolver, ViewContainerRef, OnInit, Input, ComponentRef, Output, EventEmitter, Optional, Host, SkipSelf, Self, Inject, forwardRef } from '@angular/core';
import { NgControl, FormControl, ControlContainer, NG_VALIDATORS, Validator, ValidatorFn, Validators, AsyncValidatorFn, AbstractControl } from '@angular/forms';
export function normalizeValidator(validator: ValidatorFn | Validator): ValidatorFn {
  if ((<Validator>validator).validate) {
    return (c: AbstractControl) => (<Validator>validator).validate(c);
  } else {
    return <ValidatorFn>validator;
  }
}

export const controlNameBinding: any = {
  provide: NgControl,
  useExisting: forwardRef(() => DynamicFormDirective)
};
@Directive({
  selector: '[r-dynamic-form]'
})
export class DynamicFormDirective extends NgControl implements OnInit {
  name: string;

  component: ComponentRef<any>;
  @Input('config') config: any;
  @Output('ngModelChange') update = new EventEmitter();

  _control: FormControl;

  constructor(
    @Optional() @Host() @SkipSelf() private parent: ControlContainer,
    @Optional() @Self() @Inject(NG_VALIDATORS) private validators: Array<Validator | ValidatorFn>,
    private resolver: ComponentFactoryResolver,
    private container: ViewContainerRef) {
    super();
  }

  ngOnInit() {
    console.log(this.config, this)
    let component = this.resolver.resolveComponentFactory<any>(this.config.component);
    this.name = this.config.data.id;
    this.component = this.container.createComponent(component);
    this.valueAccessor = this.component.instance;

    const ngValidators = this.component.injector.get(NG_VALIDATORS, null);
    if (ngValidators && ngValidators.some(x => x === this.component.instance)) {
      this.validators = [...(this.validators || []), ...(ngValidators as Array<Validator | ValidatorFn>)];
    }
    this._control = this.formDirective.addControl(this);
  }

  get path(): string[] {
    return [...this.parent.path!, this.name];
  }

  get formDirective(): any { return this.parent ? this.parent.formDirective : null; }

  get control(): FormControl { return this._control; }

  get validator(): ValidatorFn | null {
    return this.validators != null ? Validators.compose(this.validators.map(normalizeValidator)) : null;
  }

  get asyncValidator(): AsyncValidatorFn {

    return null;
  }

  viewToModelUpdate(newValue: any): void {
    console.log('view to jmodel', newValue)
    this.update.emit(newValue);
  }

  ngOnDestroy(): void {
    if (this.formDirective) {
      this.formDirective.removeControl(this);
    }
    if (this.component) {
      this.component.destroy();
    }
  }
}
