import { Component, input, signal } from '@angular/core';
import { NgClass } from "@angular/common";

@Component({
  selector: 'app-password',
  imports: [NgClass],
  templateUrl: './password.html',
  styleUrl: './password.css',
})
export class Password { 
  visible: boolean = false;
  placeholder = input.required<string>();
  design = input.required<string>();
  value = signal<string>('');
  focused = signal(false);
  icon = signal('/images/eye_icon.png');

  togglePasswordVisibility() {
    this.visible = !this.visible;
    this.icon.set(this.visible ? '/images/eye_slash_icon.png' : '/images/eye_icon.png');
  }

}
