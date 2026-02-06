import { Component, signal } from '@angular/core';
import { NgClass } from "@angular/common";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-signup',
  imports: [NgClass, RouterLink],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
  visible: boolean = false;
  password_focused = signal(false);
  confirm_focused = signal(false);
  password_icon = signal('/images/eye_icon.png');

  togglePasswordVisibility() {
    this.visible = !this.visible;
    this.password_icon.set(this.visible ? '/images/eye_slash_icon.png' : '/images/eye_icon.png');
  }
}
