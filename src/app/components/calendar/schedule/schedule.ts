import { Component, effect, EventEmitter, inject, input, OnInit, Output, signal } from '@angular/core';
import { NgClass } from "@angular/common";
import { LessonSchedule } from '../../../interfaces/lesson-schedule';
import { LessonService } from '../../../services/lesson-service';
import { AppState } from '../../../services/app-state';

@Component({
  selector: 'app-schedule',
  imports: [NgClass],
  templateUrl: './schedule.html',
  styleUrl: './schedule.css',
})
export class Schedule{
  protected service = inject(LessonService);
  protected state = inject(AppState);
  class = input.required<LessonSchedule>();
  section_selected = input.required<boolean>();
  schedule_selected = input.required<boolean>();

  hovered = signal<boolean>(false);

  @Output() select = new EventEmitter<LessonSchedule>();

  clicked() {
    if (this.dayPassed()) return;
    this.select.emit(this.class());
  }

  dayPassed():boolean {
    const now = new Date();

    const isPast = this.class().schedule < now;
    const isFull = this.class().students.length >= this.class().max_students;
    const alreadyJoined = this.state.user()?.id !== undefined && 
                          this.class().students.includes(this.state.user()!.id!);

    return isPast || isFull || alreadyJoined;
  }
}
