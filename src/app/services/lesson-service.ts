import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Coach } from '../interfaces/coach';
import { environment } from '../../environments/environment';
import { firstValueFrom } from 'rxjs';
import { Class } from '../interfaces/class';
import { LessonSchedule } from '../interfaces/lesson-schedule';
import { ScheduleBooking } from '../interfaces/schedule-booking';

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

  async get_schedules(branch_id:number) : Promise<Array<LessonSchedule[]>> {
    const observable = this.httpClient.get<Array<LessonSchedule[]>>(`${environment.apiURl}/lessons/schedules/${branch_id}`);
    return firstValueFrom(observable);
  }

  async book_enrollment(schedule:ScheduleBooking[], authToken:string): Promise<string>{
    const observabe = this.httpClient.post<string>(`${environment.apiURl}/transactions/enroll/`, schedule,
      {headers: new HttpHeaders('').set('Authorization', `Token ${authToken}`)}
    );
    return firstValueFrom(observabe);
  }
}
