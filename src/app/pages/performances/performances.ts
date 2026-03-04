import { NgClass } from '@angular/common';
import { Component, ElementRef, inject, OnInit, QueryList, signal, ViewChild, ViewChildren } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';
import { ContentService } from '../../services/content-service';
import { EventPerformance } from '../../interfaces/event-performance';

@Component({
  selector: 'app-performances',
  imports: [MatTooltip, NgClass],
  templateUrl: './performances.html',
  styleUrl: './performances.css',
})
export class Performances implements OnInit{
  @ViewChildren('videoPlayer') videoPlayers!: QueryList<ElementRef<HTMLVideoElement>>;

  protected service = inject(ContentService);
  performances = signal<EventPerformance[]>([]);

  showVideo:boolean[] = [];

  ngOnInit(): void {
    this.service.get_performances().then(performances => {
      this.performances.set(performances);
      this.showVideo = new Array(performances.length).fill(false);
    });
  }

  playVideo(index: number): void {
    this.showVideo[index] = true;
    const video:HTMLVideoElement = this.videoPlayers.toArray()[index].nativeElement;
    video.play();
    
  }

  pauseVideo(index: number): void {
    this.showVideo[index] = false;
    const video:HTMLVideoElement = this.videoPlayers.toArray()[index].nativeElement;
    video.pause();
    video.currentTime = 0;
  }
}
