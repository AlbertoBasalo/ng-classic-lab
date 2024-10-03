import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RegisterFormComponent } from './register-form.component';
import { RegisterRoutingModule } from './register-routing.module';
import { RegisterPage } from './register.page';

@NgModule({
  declarations: [RegisterPage, RegisterFormComponent],
  imports: [CommonModule, RegisterRoutingModule],
})
export class RegisterModule {}
