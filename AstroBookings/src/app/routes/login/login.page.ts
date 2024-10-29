import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LoginDto } from './login.dto';
import { LoginService } from './login.service';

@Component({
  templateUrl: './login.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPage {
  constructor(private readonly loginService: LoginService) {}

  onLogin(loginDto: LoginDto): void {
    const success = this.loginService.login(loginDto);
    if (success) {
      console.log('Login successful');
      // Here you would typically navigate to another page or update the UI
    } else {
      console.log('Login failed');
      // Here you would typically show an error message
    }
  }
}
