import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from "@angular/router";
import { AccountService } from '../../../services/account-service';
import { AppState } from '../../../services/app-state';
import { Enrollment } from '../../../interfaces/enrollment';

@Component({
  selector: 'app-booking',
  imports: [RouterLink],
  templateUrl: './booking.html',
  styleUrl: './booking.css',
})
export class Booking implements OnInit{
  private state = inject(AppState);
  private service = inject(AccountService);

  enrollments = signal<Enrollment[]>([]);


  ngOnInit(): void {
    this.service.get_enrollments(this.state.user()!.authToken!).then(enrollments => {this.enrollments.set(enrollments); console.log(enrollments);});
  }
}
