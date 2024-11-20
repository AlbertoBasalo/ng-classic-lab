import { Injectable } from '@angular/core';
import { UserTokenDto } from '@app/models/user-token.dto';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserStoreService {
  private userToken$: Subject<UserTokenDto | undefined> = new Subject<UserTokenDto | undefined>();

  /**
   * Observable stream of the current user.
   */
  public readonly user$: Observable<UserTokenDto | undefined> = this.userToken$.asObservable();

  /**
   * Sets the current user.
   * @param user The user to set.
   */
  setUser(user: UserTokenDto): void {
    this.userToken$.next(user);
  }

  /**
   * Clears the current user.
   */
  clearUser(): void {
    this.userToken$.next(undefined);
  }
}
