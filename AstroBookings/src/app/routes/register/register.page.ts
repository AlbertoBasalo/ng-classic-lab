import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RegisterDto } from './register.dto';
import { RegisterService } from './register.service';

@Component({
  templateUrl: './register.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterPage {
  constructor(private readonly registerService: RegisterService) {}

  onRegister(registerDto: RegisterDto): void {
    const success = this.registerService.register(registerDto);
    if (success) {
      console.log('Registration successful');
      // Here you would typically navigate to another page or update the UI
    } else {
      console.log('Registration failed');
      // Here you would typically show an error message
    }
  }
}
