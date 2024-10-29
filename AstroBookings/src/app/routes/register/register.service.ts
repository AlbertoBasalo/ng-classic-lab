import { Injectable } from '@angular/core';
import { RegisterDto } from './register.dto';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor() {}

  register(registerDto: RegisterDto): boolean {
    // This is a placeholder implementation
    // In a real application, you would typically make an API call here
    console.log(`Attempting to register user with email: ${registerDto.email}`);
    return true;
  }
}
