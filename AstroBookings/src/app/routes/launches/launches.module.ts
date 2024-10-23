import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LaunchDetailsComponent } from './launch-details.component';
import { LaunchPage } from './launch.page';
import { LaunchesRoutingModule } from './launches-routing.module';

@NgModule({
  declarations: [LaunchPage, LaunchDetailsComponent],
  imports: [CommonModule, LaunchesRoutingModule],
})
export class LaunchesModule {}
