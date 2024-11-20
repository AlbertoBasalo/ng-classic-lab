import { Component } from '@angular/core';
import { UserStoreService } from '@app/services/user.store';

@Component({
  selector: 'app-header',
  styles: [
    `
      header {
        background-color: #fff;
      }
    `,
  ],
  template: `
    <header>
      <nav>
        <ul>
          <h1><app-link [link]="['/']" [text]="appTitle"></app-link></h1>
        </ul>
        <ul>
          <li *ngFor="let link of links">
            <app-link [link]="link.path" [text]="link.label"></app-link>
          </li>
          <ng-container *ngIf="isLoggedIn$ | async as isLoggedIn; else anonymousTemplate">
            <span role="button" class="outline secondary" (click)="logout()">Logout</span>
          </ng-container>
          <ng-template #anonymousTemplate>
            <li *ngFor="let link of anonymousLinks">
              <app-link [link]="link.path" [text]="link.label"></app-link>
            </li>
          </ng-template>
        </ul>
      </nav>
    </header>
  `,
})
export class HeaderWidget {
  appTitle = 'AstroBookings';

  links = [
    { label: 'Home', path: ['/'] },
    { label: 'About', path: ['/about'] },
  ];
  anonymousLinks = [
    { label: 'Login', path: ['/login'] },
    { label: 'Register', path: ['/register'] },
  ];

  isLoggedIn$ = this.userStore.user$;

  constructor(private readonly userStore: UserStoreService) {}

  logout(): void {
    this.userStore.clearUser();
  }
}
