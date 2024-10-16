import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, ErrorHandler, NgModule } from '@angular/core';
import { LaunchesRepository } from '@app/services/launches.repository';
import { LocalStorageService } from '@app/services/local-storage.service';
import { LOG_SOURCE, LogService } from '@app/services/log.service';
import { CustomErrorHandler } from './custom-error.handler';
import { launchesRepositoryFactory } from './launches-repository.factory';
import { LayoutModule } from './layout/layout.module';
import { LogHttpInterceptor } from './log-http.interceptor';

@NgModule({
  imports: [CommonModule, LayoutModule, HttpClientModule],
  exports: [LayoutModule],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (http: HttpClient, localStorage: LocalStorageService) => () =>
        http
          .get('http://worldtimeapi.org/api/timezone/Europe/Madrid')
          .subscribe((data) => localStorage.write('time', data)),
      deps: [HttpClient, LocalStorageService],
      multi: true,
    },
    {
      provide: LOG_SOURCE,
      useValue: 'CoreModule',
    },
    {
      provide: ErrorHandler,
      useClass: CustomErrorHandler,
      deps: [LogService],
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LogHttpInterceptor,
      deps: [LogService],
      multi: true,
    },
    {
      provide: LaunchesRepository,
      useFactory: launchesRepositoryFactory,
      deps: [HttpClient],
    },
  ],
})
export class CoreModule {}
