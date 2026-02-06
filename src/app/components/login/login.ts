import { Component, ElementRef, signal, ViewChild } from '@angular/core';
import { NgClass } from "@angular/common";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-login',
  imports: [NgClass, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  visible: boolean = false;
  password_focused = signal(false);
  password_icon = signal('/images/eye_icon.png');

  togglePasswordVisibility() {
    this.visible = !this.visible;
    this.password_icon.set(this.visible ? '/images/eye_slash_icon.png' : '/images/eye_icon.png');
  }
}
