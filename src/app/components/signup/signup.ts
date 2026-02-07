import { Component, signal } from '@angular/core';
import { NgClass } from "@angular/common";
import { RouterLink } from "@angular/router";
import { Password } from "../password/password";

@Component({
  selector: 'app-signup',
  imports: [RouterLink, Password],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
}
