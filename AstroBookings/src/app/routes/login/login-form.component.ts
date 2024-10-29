import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, Validators } from '@angular/forms';
import { EmailValidator, passwordValidator } from 'app/shared/utils/validators.functions';
import { LoginDto } from './login.dto';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent {
  @Output() login = new EventEmitter<LoginDto>();

  loginForm = this.formBuilder.group({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
      asyncValidators: [this.emailValidators.validate],
      updateOn: 'blur',
    }),
    password: new FormControl('', [Validators.required, passwordValidator]),
  });

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly emailValidators: EmailValidator,
  ) {}

  get email(): AbstractControl {
    return this.loginForm.get('email')!;
  }

  get password(): AbstractControl {
    return this.loginForm.get('password')!;
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;
    const value: LoginDto = this.loginForm.value as LoginDto;
    this.login.emit(value);
  }
}
