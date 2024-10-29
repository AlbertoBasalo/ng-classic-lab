import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormBuilder, ValidatorFn, Validators } from '@angular/forms';
import { RegisterDto } from './register.dto';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterFormComponent {
  @Output() register = new EventEmitter<RegisterDto>();

  registerForm = this.formBuilder.group(
    {
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required],
      acceptTerms: [true, Validators.requiredTrue],
      role: [''],
    },
    {
      validators: [matchPasswordValidator],
    },
  );

  get username(): AbstractControl {
    return this.registerForm.get('username')!;
  }

  get email(): AbstractControl {
    return this.registerForm.get('email')!;
  }

  get password(): AbstractControl {
    return this.registerForm.get('password')!;
  }

  get repeatPassword(): AbstractControl {
    return this.registerForm.get('repeatPassword')!;
  }

  get acceptTerms(): AbstractControl {
    return this.registerForm.get('acceptTerms')!;
  }

  get role(): AbstractControl {
    return this.registerForm.get('role')!;
  }

  constructor(private readonly formBuilder: FormBuilder) {}

  onSubmit(): void {
    const { repeatPassword, ...rest } = this.registerForm.value;
    this.register.emit(rest as RegisterDto);
  }
}

/**
 * Validator to check if the password and repeat password are the same
 * - Also sets the error on the repeat password control.
 * - Could be made more abstract to match any two controls
 * @param form - The form to validate
 * @returns The validation errors or null if the form is valid
 */
const matchPasswordValidator: ValidatorFn = (form: AbstractControl) => {
  const passwordControl = form.get('password')!;
  const repeatPasswordControl = form.get('repeatPassword')!;
  const password = passwordControl.value;
  const repeatPassword = repeatPasswordControl.value;
  const error = password !== repeatPassword ? { matchPassword: 'Passwords do not match' } : null;
  if (error) {
    repeatPasswordControl.setErrors(error);
  }
  return error;
};
