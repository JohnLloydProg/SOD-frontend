import { Component, signal, ViewChild } from '@angular/core';
import { NgClass } from "@angular/common";
import { RouterLink } from "@angular/router";
import { Password } from "../../password/password";
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  imports: [RouterLink, Password, ReactiveFormsModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
  @ViewChild('password') password!:Password;
  @ViewChild('confirm_password') confirm_password!:Password;

  name = new FormControl('');
  email = new FormControl('');
  use = new FormControl(false);
  privacy = new FormControl(false);

  enable() {
    if (!this.name || !this.email || !this.use || !this.privacy || !this.password || !this.confirm_password) return false;
    if (this.name.value?.length == 0) return false;
    if (!this.email.value?.includes('@')) return false;
    if (this.password.value() != this.confirm_password.value()) return false;
    return this.use.value && this.privacy.value;
  }

  signUp() {
    
    

  }
}
