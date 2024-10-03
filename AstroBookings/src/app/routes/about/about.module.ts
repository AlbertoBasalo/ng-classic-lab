import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AboutContentComponent } from './about-content.component';
import { AboutRoutingModule } from './about-routing.module';
import { AboutPage } from './about.page';

@NgModule({
  declarations: [AboutPage, AboutContentComponent],
  imports: [CommonModule, AboutRoutingModule],
})
export class AboutModule {}
