import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterFormComponent {
  @Output() register = new EventEmitter<{ username: string; email: string; password: string }>();

  onSubmit(username: string, email: string, password: string): void {
    this.register.emit({ username, email, password });
  }
}
