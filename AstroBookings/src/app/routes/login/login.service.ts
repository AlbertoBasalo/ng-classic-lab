import { Injectable } from '@angular/core';
import { UserTokenDto } from '@app/models/user-token.dto';
import { UsersRepository } from '@app/services/users.repository';
import { Observable } from 'rxjs';
import { LoginDto } from './login.dto';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private readonly usersRepository: UsersRepository) {}

  login$(loginDto: LoginDto): Observable<UserTokenDto> {
    return this.usersRepository.login$(loginDto);
  }
}
