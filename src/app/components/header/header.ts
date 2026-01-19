import { NgClass } from '@angular/common';
import { Component, HostListener, signal } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [NgClass],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  isScrolled = false;
  classes_show = signal(false);
  events_show = signal(false);
  bookings_show = signal(false);
  show_all = signal(false);
  
  @HostListener('window:scroll')
  onWindowScroll() {
    this.isScrolled = window.scrollY > 100
  }

  extendHeader() {
    this.show_all.set(!this.show_all())
    this.classes_show.set(false);
    this.events_show.set(false);
    this.bookings_show.set(false);

  }
}
