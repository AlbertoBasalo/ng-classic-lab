import { Component, Input, OnChanges, SimpleChanges, TemplateRef } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

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
  @Input() source$!: Observable<unknown>;
  @Input() template!: TemplateRef<unknown>;
  target$!: Observable<unknown>;
  isWorking$ = new BehaviorSubject<boolean>(false);
  error$ = new BehaviorSubject<string | null>(null);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['source$']) {
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
}
