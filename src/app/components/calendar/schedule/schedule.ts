import { Component, EventEmitter, input, Output, signal } from '@angular/core';
import { NgClass } from "@angular/common";
import { ScheduleBooking } from '../../../interfaces/schedule-booking';
import { LessonSchedule } from '../../../interfaces/lesson-schedule';

@Component({
  selector: 'app-schedule',
  imports: [NgClass],
  templateUrl: './schedule.html',
  styleUrl: './schedule.css',
})
export class Schedule {
  class = input.required<LessonSchedule>();
  date = input.required<Date>();
  section_selected = input.required<boolean>();
  schedule_selected = input.required<boolean>();

  hovered = signal<boolean>(false);

  @Output() select = new EventEmitter<ScheduleBooking>();

  clicked() {
    this.select.emit({date:this.date(), schedule:this.class()});
  }
}
