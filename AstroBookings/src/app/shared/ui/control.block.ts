import { Component, forwardRef, Input } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormGroup,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'app-control',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ControlBlock),
      multi: true,
    },
  ],
  template: `
    <div>
      <label [for]="formControlName">
        {{ label || (formControlName | titlecase) }} <span *ngIf="hasError()">🚨</span>
      </label>
      <input
        [name]="formControlName"
        [type]="type"
        [id]="formControlName"
        [placeholder]="placeholder || label || formControlName"
        autocomplete="off"
        [value]="value"
        (input)="onInput($event)"
        [attr.aria-invalid]="getInvalid()"
      />
      <small *ngIf="getInvalid()">{{ getErrorMessage() }}</small>
    </div>
  `,
})
export class ControlBlock implements ControlValueAccessor {
  /**
   * The form to which the control belongs
   * - This is mandatory!
   */
  @Input() form!: FormGroup;
  /**
   * The name of the control
   * - This is mandatory!
   */
  @Input() formControlName!: string;
  /**
   * The text for the label
   */
  @Input() label = '';
  /**
   * The placeholder used as a hint
   */
  @Input() placeholder = '';
  /**
   * The type of the control
   * - Defaults to 'text'
   */
  @Input() type = 'text';

  /**
   * The name of the array to search for the control
   * - Optional, only for sub-arrays
   */
  @Input() formArrayNameStr?: string;
  /**
   * The index of the control in the array
   * - Optional, only for sub-arrays
   */
  @Input() formArrayIndexNbr?: number;
  /**
   * The name of the group to search for the control
   * - Optional, only for nested groups
   */
  @Input() formGroupNameStr?: string;

  /**
   * The current value of the control
   */
  value: unknown;
  /**
   * The function to emit the change event
   */
  emitChange: any;
  /**
   * The function to emit the touch event
   */
  emitTouch: any;

  constructor() {}

  writeValue(obj: any): void {
    this.value = obj;
  }

  /**
   * Stores a function to be called when the control value changes
   * - This method is called once by the ReactiveFormsModule when the component is initialized
   * @param fn - The function to emit the change event
   */
  registerOnChange(fn: any): void {
    this.emitChange = fn;
  }

  /**
   * Stores a function to be called when the control is touched
   * - This method is called once by the ReactiveFormsModule when the component is initialized
   * @param fn - The function to emit the touch event
   */
  registerOnTouched(fn: any): void {
    this.emitTouch = fn;
  }

  /**
   * The event handler for the input event
   * - notifies the ReactiveFormsModule that the value has changed
   * @param event - The InputEvent to handle
   */
  onInput(event: any) {
    this.value = event.target.value;
    this.emitChange(this.value);
    this.emitTouch();
  }

  // Utility methods

  hasError() {
    return this.getControl().invalid;
  }
  getInvalid(): boolean | undefined {
    if (this.getControl().pristine) {
      // user has not interacted with the control yet
      return undefined;
    }
    return this.getControl().invalid;
  }
  getErrorMessage() {
    return JSON.stringify(this.getControl().errors || {});
  }
  private getControl() {
    //console.log('getting control', this.formControlName);
    let control: AbstractControl | null = this.form.get(this.formControlName);
    if (!control) {
      const searchArray = [];
      if (this.formArrayNameStr) searchArray.push(this.formArrayNameStr);
      if (this.formArrayIndexNbr !== undefined) searchArray.push(this.formArrayIndexNbr);
      if (this.formGroupNameStr) searchArray.push(this.formGroupNameStr);
      searchArray.push(this.formControlName);
      control = this.form.get(searchArray);
      if (!control) {
        throw new Error(`Control ${this.formControlName} not found`);
      }
    }
    return control;
  }
}
