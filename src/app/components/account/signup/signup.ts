import { Component, inject, signal, ViewChild } from '@angular/core';
import { NgClass } from "@angular/common";
import { Router, RouterLink } from "@angular/router";
import { Password } from "../../password/password";
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AccountService } from '../../../services/account-service';
import { User } from '../../../interfaces/user';

@Component({
  selector: 'app-signup',
  imports: [RouterLink, Password, ReactiveFormsModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
  @ViewChild('password') password!:Password;
  @ViewChild('confirm_password') confirm_password!:Password;

  protected service = inject(AccountService);
  protected router = inject(Router);

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
    
    if (this.email.value && this.name.value) {
      let user:User = {
        email:this.email.value,
        password:this.password.value(),
        username:this.name.value
      };

      this.service.register(user).then(data => this.router.navigate(['', {outlets:{sidebar: 'login'}}]));
    }

  }
}
