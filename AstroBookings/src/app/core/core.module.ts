import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, ErrorHandler, NgModule } from '@angular/core';
import { LaunchesRepository } from '@app/services/launches.repository';
import { LocalStorageService } from '@app/services/local-storage.service';
import { LOG_SOURCE, LogService } from '@app/services/log.service';
import { appInitializerFactory } from './app-initializer.factory';
import { CustomErrorHandler } from './custom-error.handler';
import { launchesRepositoryFactory } from './launches-repository.factory';
import { LayoutModule } from './layout/layout.module';
import { LogHttpInterceptor } from './log-http.interceptor';

/**
 * The Core Module configures providers for the entire application
 * In particular, it configures
 * - the APP_INITIALIZER provider to initialize the application
 * - the ErrorHandler to handle errors
 * - the HTTP_INTERCEPTORS provider to intercept HTTP requests and log them
 * - the LaunchesRepository provider to choose the correct implementation of the LaunchesRepository
 */
@NgModule({
  imports: [CommonModule, LayoutModule, HttpClientModule],
  exports: [LayoutModule],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFactory,
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
