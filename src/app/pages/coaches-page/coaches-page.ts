import { Component, inject, OnInit, signal } from '@angular/core';
import { LessonService } from '../../services/lesson-service';
import { Coach } from '../../interfaces/coach';

@Component({
  selector: 'app-coaches-page',
  imports: [],
  templateUrl: './coaches-page.html',
  styleUrl: './coaches-page.css',
})
export class CoachesPage implements OnInit{
  protected service = inject(LessonService);

  coaches = signal<Coach[]>([]);

  ngOnInit(): void {
    this.service.get_coaches().then(coaches => this.coaches.set(coaches));
  }

}
