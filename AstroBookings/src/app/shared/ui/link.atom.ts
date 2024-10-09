import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-link',
  template: `<a [routerLink]="link">{{ text }}</a>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkAtom {
  @Input() href: string = '';
  @Input() target: string = '_self';
  @Input() link: string[] = [];
  @Input() text: string = '';
}
