import { Component, input } from '@angular/core';
import { Class } from '../../interfaces/class';

@Component({
  selector: 'app-class-card',
  imports: [],
  templateUrl: './class-card.html',
  styleUrl: './class-card.css',
})
export class ClassCard {
  public class = input.required<Class>();
}
