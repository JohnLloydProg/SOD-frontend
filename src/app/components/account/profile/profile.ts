import { Component, inject } from '@angular/core';
import { Password } from "../../password/password";
import { RouterLink } from "@angular/router";
import { AppState } from '../../../services/app-state';

@Component({
  selector: 'app-profile',
  imports: [Password, RouterLink],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  protected state = inject(AppState);
}
