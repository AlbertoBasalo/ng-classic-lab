import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginFormComponent } from './login-form.component';
import { LoginRoutingModule } from './login-routing.module';
import { LoginPage } from './login.page';

@NgModule({
  declarations: [LoginPage, LoginFormComponent],
  imports: [CommonModule, FormsModule, LoginRoutingModule],
})
export class LoginModule {}
