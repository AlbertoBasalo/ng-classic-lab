import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BannerComponent } from './banner.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomePage } from './home.page';

@NgModule({
  imports: [CommonModule, HomeRoutingModule],
  declarations: [HomePage, BannerComponent],
})
export class HomeModule {}
