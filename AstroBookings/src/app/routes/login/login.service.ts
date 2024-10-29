import { Injectable } from '@angular/core';
import { LoginDto } from './login.dto';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor() {}

  login(loginDto: LoginDto): boolean {
    // This is a placeholder implementation
    // In a real application, you would typically make an API call here
    console.log(`Attempting to log in user: ${loginDto.email}`);
    return loginDto.email === 'admin' && loginDto.password === 'password';
  }
}
