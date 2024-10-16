import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { launchesRepositoryFactory } from '@app/services/launches-repository.factory';
import { LaunchesRepository } from '@app/services/launches.repository';
import { LayoutModule } from './layout/layout.module';

@NgModule({
  imports: [CommonModule, LayoutModule, HttpClientModule],
  exports: [LayoutModule],
  providers: [
    {
      provide: LaunchesRepository,
      useFactory: launchesRepositoryFactory,
      deps: [HttpClient],
    },
  ],
})
export class CoreModule {}
