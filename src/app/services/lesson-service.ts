import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Coach } from '../interfaces/coach';
import { environment } from '../../environments/environment';
import { firstValueFrom } from 'rxjs';
import { Class } from '../interfaces/class';
import { LessonSchedule } from '../interfaces/lesson-schedule';

@Injectable({
  providedIn: 'root',
})
export class LessonService {
  private httpClient = inject(HttpClient);
  
  async get_coaches() : Promise<Coach[]> {
    const observable = this.httpClient.get<Coach[]>(`${environment.apiURl}/members/coaches`);
    return firstValueFrom(observable);
  }

  async get_lessons_per_coach(coach_id:number) : Promise<string[]> {
    const observable = this.httpClient.get<string[]>(`${environment.apiURl}/lessons/lessons-coach/${coach_id}`);
    return firstValueFrom(observable);
  }

  async get_classes() : Promise<Class[]> {
    const observable = this.httpClient.get<Class[]>(`${environment.apiURl}/lessons/classes`);
    return firstValueFrom(observable);
  }

  async get_schedules() : Promise<LessonSchedule[]> {
    const observable = this.httpClient.get<LessonSchedule[]>(`${environment.apiURl}/lessons/schedules`);
    return firstValueFrom(observable);
  }
}
