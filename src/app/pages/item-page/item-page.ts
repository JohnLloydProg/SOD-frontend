import { Component, input, signal } from '@angular/core';
import { MerchItem } from '../../interfaces/merch-item';

@Component({
  selector: 'app-item-page',
  imports: [],
  templateUrl: './item-page.html',
  styleUrl: './item-page.css',
})
export class ItemPage {
  id = input.required<number>();
  item:MerchItem = {
    id:0,
    name: 'SOD T-Shirt',
    price: 700.00,
    image_links: ['/images/merch/item_1/image_1.png', '/images/merch/item_1/image_1.png']
  }
  current_index = signal<number>(0);
  counter = signal<number>(1);

  next() {
    if (this.current_index() == this.item.image_links.length - 1) {return;}
    this.current_index.set(this.current_index() + 1);
  }

  previous() {
    if (this.current_index() == 0) {return;}
    this.current_index.set(this.current_index() - 1);
  }

  add() {
    this.counter.set(this.counter() + 1);
  }

  subtract() {
    if (this.counter() == 1) {return;}
    this.counter.set(this.counter() - 1)
  }
}
