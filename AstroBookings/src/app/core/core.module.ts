import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LaunchesMemRepository } from '@app/services/launches.mem.repository';
import { LaunchesRepository } from '@app/services/launches.repository';
import { LayoutModule } from './layout/layout.module';

@NgModule({
  imports: [CommonModule, LayoutModule],
  exports: [LayoutModule],
  providers: [
    {
      provide: LaunchesRepository,
      useClass: LaunchesMemRepository,
    },
  ],
})
export class CoreModule {}
