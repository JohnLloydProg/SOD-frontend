import { Component } from '@angular/core';
import { MerchItem } from '../../interfaces/merch-item';

@Component({
  selector: 'app-merch-page',
  imports: [],
  templateUrl: './merch-page.html',
  styleUrl: './merch-page.css',
})
export class MerchPage {
  merchandises: MerchItem[] = [
    {
      id:0,
      name: 'SOD T-Shirt',
      price: 700.00,
      image_links: ['/images/merch/item_1/image_1.png', '/images/merch/item_1/image_1.png']
    },
    {
      id:1,
      name: 'SOD T-Shirt',
      price: 700.00,
      image_links: ['/images/merch/item_1/image_1.png', '/images/merch/item_1/image_1.png']
    }
  ]
}
