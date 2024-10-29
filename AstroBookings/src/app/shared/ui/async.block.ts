import { Component, Input, OnChanges, SimpleChanges, TemplateRef } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

/**
 * Asynchronous component to display data from an observable
 * - Uses the template given to display the data
 * - Checks if it is working
 * - Checks if there are errors
 */
@Component({
  selector: 'app-async-block',
  template: `
    <ng-container *ngIf="target$ | async as target">
      <ng-container *ngTemplateOutlet="template; context: { $implicit: target }"></ng-container>
    </ng-container>
    <aside *ngIf="isWorking$ | async" aria-busy="true">Loading...</aside>
    <input *ngIf="error$ | async as error" readonly [value]="error" aria-invalid="true" />
  `,
})
export class AsyncBlock implements OnChanges {
  /**
   * Observable to get the data
   */
  @Input() source$!: Observable<unknown>;
  /**
   * Template to display the data
   */
  @Input() template!: TemplateRef<unknown>;
  /**
   * Piped source$ to check status and errors
   */
  target$!: Observable<unknown>;
  /**
   * Is working status
   */
  isWorking$ = new BehaviorSubject<boolean>(false);
  /**
   * Error status
   */
  error$ = new BehaviorSubject<string | null>(null);

  /**
   * On source$ changes, pipe the source$ to check status and errors
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['source$']) return;
    this.isWorking$.next(true);
    this.target$ = this.source$.pipe(
      tap({
        next: () => this.isWorking$.next(false),
        error: (error) => {
          this.isWorking$.next(false);
          this.error$.next(error.statusText || error.message || 'Unknown error');
        },
      }),
    );
  }
}
