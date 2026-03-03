import { NgClass } from '@angular/common';
import { Component, EventEmitter, inject, Output, signal } from '@angular/core';
import { AppState } from '../../services/app-state';
import { AccountService } from '../../services/account-service';
import { Ticket } from '../../interfaces/ticket';

@Component({
  selector: 'app-ticket-overlay',
  imports: [NgClass, ],
  templateUrl: './ticket-overlay.html',
  styleUrl: './ticket-overlay.css',
})
export class TicketOverlay {
  protected service = inject(AccountService);
  protected state = inject(AppState);
  
  tickets = signal<Ticket[]>([]);   
  selected_ticket:number = -1;
  hovered_ticket:number = -1;

  @Output() close = new EventEmitter<void>();
  @Output() book = new EventEmitter<number>();

  ngOnInit(): void {
    this.service.get_tickets(this.state.user()?.authToken!).then(tickets=> this.tickets.set(tickets));
  }

  is_hovered(ticket_id:number):boolean {
    return ticket_id == this.hovered_ticket || ticket_id == this.selected_ticket;
  }
}
