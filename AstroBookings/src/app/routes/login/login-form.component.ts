import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent {
  @Output() login = new EventEmitter<{ username: string; password: string }>();

  onSubmit(username: string, password: string): void {
    this.login.emit({ username, password });
  }
}
