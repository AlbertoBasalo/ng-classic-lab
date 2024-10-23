import { Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-list-block',
  template: ` <ng-container *ngIf="items.length > 0; else empty">
      <ng-content></ng-content>
      <ng-container *ngFor="let item of items">
        <ng-container *ngTemplateOutlet="template; context: { $implicit: item }"></ng-container>
      </ng-container>
    </ng-container>
    <ng-template #empty>
      <input readonly type="text" name="empty" value="No data found" />
    </ng-template>`,
})
export class ListBlock {
  @Input() items!: unknown[];
  @Input() template!: TemplateRef<unknown>;
  // ToDo: add *ngFor with a template for each item
}
