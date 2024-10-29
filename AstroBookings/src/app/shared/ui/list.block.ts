import { Component, Input, TemplateRef } from '@angular/core';

/**
 * Synchronous component to display a list of items
 * - Uses the template given to display the items
 * - Checks if there are items to display
 */
@Component({
  selector: 'app-list-block',
  template: `
    <ng-container *ngIf="items.length > 0; else empty">
      <ng-content></ng-content>
      <ng-container *ngFor="let item of items">
        <ng-container *ngTemplateOutlet="template; context: { $implicit: item }"></ng-container>
      </ng-container>
    </ng-container>
    <ng-template #empty>
      <input readonly type="text" name="empty" value="No data found" />
    </ng-template>
  `,
})
export class ListBlock {
  /**
   * List of items to display
   */
  @Input() items!: unknown[];
  /**
   * Template to display the items
   */
  @Input() template!: TemplateRef<unknown>;
}
