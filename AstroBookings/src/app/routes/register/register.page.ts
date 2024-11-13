import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Subject, exhaustMap } from 'rxjs';
import { RegisterDto } from './register.dto';
import { RegisterService } from './register.service';

@Component({
  templateUrl: './register.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterPage {
  /**
   *  Subject to handle registration events
   */
  private registerSubject = new Subject<RegisterDto>();

  constructor(private readonly registerService: RegisterService) {
    // handle the stream throughout to avoid multiple requests
    this.registerSubject
      .pipe(
        // exhaustMap to ignore new registration attempts while processing an existing one
        exhaustMap((dto) => this.registerService.register$(dto)),
      )
      .subscribe();
  }

  /**
   *  Method to handle registration events
   *  @param registerDto - The registration data
   *  - Emits the registration data to the registerSubject
   */
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
