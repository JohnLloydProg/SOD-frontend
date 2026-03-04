import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { firstValueFrom } from 'rxjs';
import { EventPerformance } from '../interfaces/event-performance';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  private httpClient = inject(HttpClient);

  async get_events():Promise<Event[]> {
    const observable = this.httpClient.get<Event[]>(`${environment.apiURl}/contents/events/`);
    return firstValueFrom(observable);
  }

  async get_performances():Promise<EventPerformance[]> {
    const observable = this.httpClient.get<EventPerformance[]>(`${environment.apiURl}/contents/event-profile/`);
    return firstValueFrom(observable);
  }
}
