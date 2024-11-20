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
    this.loginService.login$(loginDto).subscribe((userTokenDto) => {
      console.log('Login successful', userTokenDto);
    });
  }
}
