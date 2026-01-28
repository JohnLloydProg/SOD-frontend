import { Component, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-studio-rental-page',
  imports: [],
  templateUrl: './studio-rental-page.html',
  styleUrl: './studio-rental-page.css',
})
export class StudioRentalPage {
  quezon_images = [
    '/images/studio/quezon/gallery_1.jpg', '/images/studio/quezon/gallery_2.jpg', '/images/studio/quezon/gallery_3.jpg'
  ]
  binondo_images = [
    '/images/studio/binondo/gallery_1.jpg', '/images/studio/binondo/gallery_2.jpg', '/images/studio/binondo/gallery_3.jpg',
    '/images/studio/binondo/gallery_4.jpg'
  ]

  start_times:string[] = [];
  end_times:string[] = [];
  available_scheds!:Array<[number, number]>;
  today:Date;

  quezon_active_index = signal<number>(0);
  binondo_active_index = signal<number>(0);

  selected_date!:Date;
  selected_branch = signal<string>('');
  start_index = signal<number>(0);
  start_sched = signal<[number, number]>([0, 0]);
  end_sched = signal<[number, number]>([0, 0]);

  constructor() {
    this.today = new Date();
    this.today.setDate(this.today.getDate() + 1);
  }

  next(branch:string) {
    if (branch == 'quezon') {
      if (this.quezon_active_index() == this.quezon_images.length - 1) {this.quezon_active_index.set(0); return;}
      this.quezon_active_index.set(this.quezon_active_index() + 1);
    }else {
      if (this.binondo_active_index() == this.binondo_images.length - 1) {this.binondo_active_index.set(0); return;}
      this.binondo_active_index.set(this.binondo_active_index() + 1);
    }
  }

  previous(branch:string) {
    if (branch == 'quezon') {
      if (this.quezon_active_index() == 0) {this.quezon_active_index.set(this.quezon_images.length - 1); return;}
      this.quezon_active_index.set(this.quezon_active_index() - 1);
    }else {
      if (this.binondo_active_index() == 0) {this.binondo_active_index.set(this.binondo_images.length - 1); return;}
      this.binondo_active_index.set(this.binondo_active_index() - 1);
    }
  }

  findGroup(time:number) : number {
    for (const [index, range] of this.available_scheds.entries()) {
      if (time >= range[0] && time <= range[1]) {
        return index;
      } 
    }

    return -1;
  }

  selectDate(date:string) {
    this.start_times = [];
    this.selected_date =  new Date(date);
    this.available_scheds = [[10.5, 14.5], [16, 22]];
    for (let i = 8; i < 22.5; i+= 0.5) {

      if (this.findGroup(i) < 0) {
        continue;
      }
      
      let hour = Math.floor(i);
      let min = (i % 1) * 60;

      const min_display = min.toString().padStart(2, '0');
      const hour_display = hour <= 12 ? hour : hour - 12;
      const am_pm = hour < 12 ? 'AM' : 'PM';

      this.start_times.push(`${hour_display}:${min_display} ${am_pm}`);
    }
  }

  selectStartTime(index:string) {
    const _index = parseInt(index);
    this.start_index.set(_index);
    const time = this.start_times.at(_index);
    if (time) {
      this.end_times = [];
      let am_pm = time.split(' ')[1];
      let hour_minute = time.split(' ')[0].split(':');
      const start_min = parseInt(hour_minute[1]);
      const start_hour = parseInt(hour_minute[0]) + (am_pm == 'PM' ? 12 : 0);
      this.start_sched.set([start_hour,  start_min])

      const start_time = start_hour + (start_min/60)
      const group = this.findGroup(start_time)
      const time_range = this.available_scheds[group];
      for (let i = start_time; i <= time_range[1]; i += 0.5) {
        let hour = Math.floor(i);
        let min = (i % 1) * 60;

        const min_display = min.toString().padStart(2, '0');
        const hour_display = hour <= 12 ? hour : hour - 12;
        const am_pm = hour < 12 ? 'AM' : 'PM';
        this.end_times.push(`${hour_display}:${min_display} ${am_pm}`)
      }
      
    }

  }

  selectEndTime(time:string) {
    if (time) {
      let am_pm = time.split(' ')[1];
      let hour_minute = time.split(' ')[0].split(':');
      const hour = parseInt(hour_minute[0]) + (am_pm == 'PM' ? 12 : 0);
      this.end_sched.set([hour, parseInt(hour_minute[1])])
      console.log(this.end_sched())
    }

  }

}
