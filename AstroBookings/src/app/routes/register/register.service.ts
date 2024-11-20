import { Injectable } from '@angular/core';
import { UserTokenDto } from '@app/models/user-token.dto';

import { UsersRepository } from '@app/services/users.repository';
import { Observable, tap } from 'rxjs';
import { RegisterDto } from './register.dto';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private readonly usersRepository: UsersRepository) {}

  register$(registerDto: RegisterDto): Observable<UserTokenDto> {
    return this.usersRepository.register$(registerDto).pipe(
      tap((userTokenDto) => {
        console.log('Register successful', userTokenDto);
      }),
    );
  }
}
