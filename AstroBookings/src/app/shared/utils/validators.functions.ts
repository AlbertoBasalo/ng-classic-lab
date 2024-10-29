import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { map, Observable } from 'rxjs';

/**
 * Validates that the password contains at least one digit and one letter
 * @param control - The control to validate
 * @returns The validation errors or null if the control is valid
 */
export const passwordValidator = (control: AbstractControl): ValidationErrors | null => {
  const value: string = control.value;
  const hasDigits = /\d/.test(value);
  if (!hasDigits) return { password: 'Password must contain digits' };
  const hasLetters = /[a-zA-Z]/.test(value);
  if (!hasLetters) return { password: 'Password must contain letters' };
  return null;
};

@Injectable({
  providedIn: 'root',
})
export class EmailValidator implements AsyncValidator {
  constructor(private readonly http: HttpClient) {}

  /**
   * Async validator function for email
   * @remarks This is a wrapper for the emailValidator function. Must be a fat arrow function to get binded with the component
   * @param control - The control with the email to validate
   * @returns A function that returns an observable when called with the control
   */
  validate: AsyncValidatorFn = (control: AbstractControl) => this.emailValidator(control);

  /**
   * Validates if the email already exists
   * @param control - The control with the email to validate
   * @returns An observable that emits the validation errors or null if the control is valid
   */
  private emailValidator(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.http
      .get<boolean>(`/api/users/email-exists?email=${control.value}`)
      .pipe(map((exists) => (exists ? { email: 'Email already exists' } : null)));
  }
}
