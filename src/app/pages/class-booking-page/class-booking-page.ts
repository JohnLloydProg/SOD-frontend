import { Component, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import { ClassSchedule } from '../../interfaces/class-schedule';
import { Schedule } from '../../components/calendar/schedule/schedule';
import { NgClass } from '@angular/common';
import { AppState } from '../../services/app-state';
import { LessonService } from '../../services/lesson-service';
import { LessonSchedule } from '../../interfaces/lesson-schedule';
import { AccountService } from '../../services/account-service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Branch } from '../../interfaces/branch';
import { Coach } from '../../interfaces/coach';
import { Class } from '../../interfaces/class';
import { Ticket } from '../../interfaces/ticket';
import { TicketOverlay } from '../../components/ticket-overlay/ticket-overlay';
import { Router } from '@angular/router';

function getDaysInMonthWithWeekday(year: number, month: number): { day: number, weekday: number }[] {
    const date = new Date(year, month, 1);
    const days = [];
    while (date.getMonth() === month) {
        days.push({
            day: date.getDate(),
            weekday: date.getDay()
        });
        
        date.setDate(date.getDate() + 1);
    }
    return days;
}

@Component({
  selector: 'app-class-booking-page',
  imports: [Schedule, NgClass, ReactiveFormsModule, TicketOverlay],
  templateUrl: './class-booking-page.html',
  styleUrl: './class-booking-page.css',
})
export class ClassBookingPage implements OnInit {
  @ViewChild('monthSelect') monthSelect!:ElementRef;
  protected state = inject(AppState);
  protected lesson_service = inject(LessonService);
  protected account_service = inject(AccountService); 
  protected router = inject(Router);

  months = [
    'January', 'February', 'March', 'April', 'May',
    'June', 'July', 'August', 'September', 'October',
    'November', 'December'
  ]
  classes = signal<LessonSchedule[]>([]);

  date = new Date();
  days!:{ day: number, weekday: number }[];
  cells:Array<Date | undefined> = [];
  selected_date_mobile:Date|null = null;
  selected_schedules:LessonSchedule[] = [];
  branch = new FormControl(1);
  coach = new FormControl('-1');
  lesson = new FormControl('-1');
  branches = signal<Branch[]>([]);
  coaches = signal<Coach[]>([]);
  lessons = signal<Class[]>([]);
  tickets = signal<Ticket[]>([]);
  coach_lessons = signal<string[]>([]);
  finalizing_booking = false;
  changing_month = false;
  booking = false;

  ngOnInit(): void {
    this.account_service.get_branches().then(branches => {
      this.branches.set(branches);
      this.branch.setValue(branches[0].id); 
      this.lesson_service.get_schedules(branches[0].id).then(schedules => {
        schedules.map(schedule => {
          schedule.schedule = new Date(schedule.schedule);
        })
        this.classes.set(schedules);
      });
      this.monthSelect.nativeElement.value = this.date.getMonth();
    }).catch((error) => {
        if (error.status === 401) {
          console.log('Unauthorized: token is invalid or expired. Logging out...');
          localStorage.removeItem('authToken');
          this.state.user.set(null);
          window.dispatchEvent(new Event('force-login'));
        } else { 
          console.log(error.message);
        }
    });
    
    this.lesson_service.get_coaches().then(coaches => this.coaches.set(coaches));
    this.lesson_service.get_classes().then(lessons => this.lessons.set(lessons));
    this.branch.valueChanges.subscribe(branch_id => {
      this.selected_schedules = [];
      if (branch_id) {
        this.lesson_service.get_schedules(branch_id).then(schedules => {this.classes.set(schedules);})
      }
    });
    this.coach.valueChanges.subscribe(coach_id => {
      this.lesson.setValue('-1');
      if (coach_id && coach_id != '-1') {
        this.lesson_service.get_lessons_per_coach(parseInt(coach_id)).then(lessons => {
          this.coach_lessons.set(lessons.filter(value => this.branchLesson(value)));
        });
      }else {
        this.coach_lessons.set([]);
      }
    });
    this.updateCalendar();
  }

  branchLesson(title:string) {
    for (const lesson of this.classes()) {
      if (lesson.lesson.title == title) {
        return true;
      }
    }
    return false;
  }

  getLessonId(title:string) {
    for (const lesson of this.lessons()) {
      if (lesson.title == title) {
        return lesson.id;
      }
    }
    return -1;
  }

  updateCalendar() {
    this.days = getDaysInMonthWithWeekday(this.date.getFullYear(), this.date.getMonth());
    this.cells = [];
    let day1_weekday = this.days[0].weekday;

    for (let i = 0; i < day1_weekday; i++) {
      this.cells.push(undefined);
    }

    for (const day of this.days) {
      let date = new Date(this.date.getFullYear(), this.date.getMonth(), day.day);
      date.setHours(0, 0, 0, 0);
      this.cells.push(date);
    }

    const remainingCells = 7 - (this.cells.length % 7);
    if (remainingCells < 7) {
      for (let i = 0; i < remainingCells; i++) {
        this.cells.push(undefined);
      }
    }
  }

  payment(ticket:Ticket) {
    if (this.booking) return;

    if (this.selected_schedules.length == 0) {
      alert('Please select a schedule!');
      return;
    }

    if (this.selected_schedules.length > ticket.package.number_of_sessions - ticket.used_sessions) {
      alert(`You have selected ${this.selected_schedules.length} sessions, but your ticket only has ${ticket.package.number_of_sessions - ticket.used_sessions} remaining. Please select fewer sessions or purchase a new ticket.`);
      return;
    }

    this.booking = true;
    this.lesson_service.book_enrollment(this.selected_schedules, ticket.id, this.state.user()?.authToken!).then(response =>
      this.router.navigate(['/'])
    ).finally(() => {this.booking = false;});
  }

  nextMonth() {
    if (this.date.getMonth() == 11 || this.changing_month) {return;}
    this.changing_month = true;
    this.lesson_service.get_schedules(this.branch.value!).then(schedules => {
      schedules.map(schedule => {
          schedule.schedule = new Date(schedule.schedule);
        })
      this.date.setMonth(this.date.getMonth() + 1);
      this.monthSelect.nativeElement.value = this.date.getMonth();
      this.classes.set(schedules);
      this.updateCalendar();
      this.changing_month = false;
    })
  }

  previousMonth() {
    if (this.date.getMonth() == 0 || this.changing_month) {return;}
    this.changing_month = true;
    this.lesson_service.get_schedules(this.branch.value!).then(schedules => {
      schedules.map(schedule => {
          schedule.schedule = new Date(schedule.schedule);
        })
      this.date.setMonth(this.date.getMonth() - 1);
      this.monthSelect.nativeElement.value = this.date.getMonth();
      this.classes.set(schedules);
      this.updateCalendar();
      this.changing_month = false;
    })
  }

  selectedMonth(month:string) {
    this.lesson_service.get_schedules(this.branch.value!).then(schedules => {
      this.date.setMonth(parseInt(month));
      this.classes.set(schedules);
      this.updateCalendar();
    });
  }

 
  checkSelectedByDay(date:Date) : boolean {
    for (const schedule of this.selected_schedules) {
      if (schedule.schedule.toDateString() == date.toDateString()) {
        return true;
      }
    }
    return false;
  }

  checkSelected(lesson_schedule:LessonSchedule) : boolean {
    return this.selected_schedules.includes(lesson_schedule);
  }

  clickedDay(date:Date) {
    if (this.state.screen_width() < 1024) {
      this.selected_date_mobile = date != this.selected_date_mobile ? date : null;
    }
  }

  filterClass(_class:LessonSchedule):boolean {
    if (this.lesson.value && this.coach.value) {
      let lesson_id = parseInt(this.lesson.value);
      let coach_id = parseInt(this.coach.value);
      return (_class.lesson.id == lesson_id || lesson_id == -1) && (_class.coach.id == coach_id || coach_id  == -1);
    }

    return true
  }

  getMonth(month:string) {
    return this.months[parseInt(month)];
  }

  clickedSchedule(schedule_booking:LessonSchedule):void {
    const index = this.selected_schedules.findIndex(_booking => schedule_booking.id == _booking.id);
    if (index < 0) {
      this.selected_schedules.push(schedule_booking);
      console.log(this.selected_schedules)
    }else {
      this.selected_schedules = this.selected_schedules.filter((_, i) => i !== index);
      console.log(this.selected_schedules)
    }
  }

  finalizedBooking() {
    if (!this.state.user()) {
      window.dispatchEvent(new Event('force-login'));
      return;
    }
    this.account_service.get_tickets(this.branch.value, this.state.user()?.authToken!).then(tickets => {
      this.tickets.set(tickets);
      this.finalizing_booking = true;
    });
  }
}
