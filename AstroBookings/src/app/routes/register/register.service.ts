import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@app/env/environment';
import { UserTokenDto } from '@app/models/user-token.dto';
import { Observable } from 'rxjs';
import { RegisterDto } from './register.dto';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private readonly http: HttpClient) {}

  register$(registerDto: RegisterDto): Observable<UserTokenDto> {
    // This is a placeholder implementation
    // In a real application, you would typically make an API call here
    console.log(`Attempting to register user with email: ${registerDto.email}`);
    return this.http.post<UserTokenDto>(
      `${environment.apiUrl}/register?delay=1000&status=201`,
      registerDto,
    );
  }
}
