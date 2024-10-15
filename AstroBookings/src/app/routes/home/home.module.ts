import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { UiModule } from '@app/ui/ui.module';
import { BannerComponent } from './banner.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomePage } from './home.page';

@NgModule({
  imports: [CommonModule, HomeRoutingModule, UiModule],
  declarations: [HomePage, BannerComponent],
})
export class HomeModule {}
