import { Component, ElementRef, signal, ViewChild } from '@angular/core';
import { NgClass } from "@angular/common";
import { RouterLink } from "@angular/router";
import { Password } from "../password/password";

@Component({
  selector: 'app-login',
  imports: [RouterLink, Password],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
}
