import { Injectable, signal } from '@angular/core';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class AppState {
  /*{
    id: 'abc',
    name: 'abc efg',
    email: 'abc@gmail.com',
    password: 'abc12345',
    contact_number: '091234',
    birthday: new Date(),
    address: 'abc street',
  }*/
  readonly user = signal<User|null>(null);
  overlay_show = signal(false);
  screen_width = signal<number>(0);
  screen_height = signal<number>(0);

  set_user(user: User|null) {
    this.user.set(user);
  }
}
