import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@app/env/environment';
import { UserTokenDto } from '@app/models/user-token.dto';
import { LoginDto } from 'app/routes/login/login.dto';
import { RegisterDto } from 'app/routes/register/register.dto';

import { Observable, tap } from 'rxjs';
import { UserStoreService } from './user.store';

@Injectable({
  providedIn: 'root',
})
export class UsersRepository {
  private readonly baseUrl = `${environment.apiUrl}/users`;

  constructor(private readonly http: HttpClient, private readonly userStore: UserStoreService) {}

  register$(registerDto: RegisterDto): Observable<UserTokenDto> {
    console.log(`Registering user with email: ${registerDto.email}`);
    return this.http.post<UserTokenDto>(`${this.baseUrl}/register`, registerDto).pipe(
      tap((userTokenDto) => {
        this.userStore.setUser(userTokenDto);
      }),
    );
  }

  login$(loginDto: LoginDto): Observable<UserTokenDto> {
    console.log(`Logging in user with email: ${loginDto.email}`);
    return this.http.post<UserTokenDto>(`${this.baseUrl}/login`, loginDto).pipe(
      tap((userTokenDto) => {
        this.userStore.setUser(userTokenDto);
      }),
    );
  }
}
