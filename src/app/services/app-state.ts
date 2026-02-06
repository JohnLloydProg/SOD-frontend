import { Injectable, signal } from '@angular/core';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class AppState {
  readonly user = signal<User|null>(null);
  overlay_show = signal(false);

  set_user(user: User) {
    this.user.set(user);
  }
}
