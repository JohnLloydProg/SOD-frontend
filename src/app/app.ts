import { Component, inject, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { NgClass } from "@angular/common";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, NgClass],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('test');
  sidebar_show = signal(false);
  route = inject(Router);

  constructor() {
  }
}
