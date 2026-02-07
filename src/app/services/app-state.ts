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
  readonly user = signal<User|null>({
    id: 'abc',
    name: 'abc efg',
    email: 'abc@gmail.com',
    password: 'abc12345',
    contact_number: '091234',
    birthday: new Date(),
    address: 'abc street',
  });
  overlay_show = signal(false);

  set_user(user: User) {
    this.user.set(user);
  }
}
