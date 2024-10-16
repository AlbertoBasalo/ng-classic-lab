import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { LaunchesRepository } from '@app/services/launches.repository';
import { launchesRepositoryFactory } from './launches-repository.factory';
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
