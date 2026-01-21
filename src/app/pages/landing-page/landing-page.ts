import { Component, ElementRef, HostListener, signal, ViewChild } from '@angular/core';
import { StackCarousel } from '../../components/stack-carousel/stack-carousel';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-landing-page',
  imports: [StackCarousel, NgClass],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.css',
})
export class LandingPage {
  @ViewChild('track') track! : ElementRef;
  contentTransform = signal('translateY(0px)');
  private scrollTimeout:any;
  public progress = 0;

  @HostListener('wheel', ['$event'])
  onWheel(event:WheelEvent) {
    clearTimeout(this.scrollTimeout);
    this.scrollTimeout = setTimeout(() => {
      const trackEl = this.track.nativeElement;
      const rect = trackEl.getBoundingClientRect();

      const distFromTop = -rect.top;

      const totalDistance = trackEl.offsetHeight - window.innerHeight;

      let preProgress = distFromTop / totalDistance;

      this.progress = Math.max(0, Math.min(preProgress, 1)) * 100;
      
    }, 10);
    

  }

}
