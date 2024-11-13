import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Subject, exhaustMap } from 'rxjs';
import { RegisterDto } from './register.dto';
import { RegisterService } from './register.service';

@Component({
  templateUrl: './register.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterPage {
  private registerSubject = new Subject<RegisterDto>();

  constructor(private readonly registerService: RegisterService) {
    this.registerSubject.pipe(exhaustMap((dto) => this.registerService.register$(dto))).subscribe();
  }

  onRegister(registerDto: RegisterDto): void {
    this.registerSubject.next(registerDto);
  }
}

/**
 * 
 * 
export class RegisterPage {
  constructor(private readonly registerService: RegisterService) {}

  onRegister(registerDto: RegisterDto): void {
    this.registerService.register$(registerDto).subscribe();
  }
}
 * 
 */
