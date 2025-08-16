import { Component } from '@angular/core';

@Component({
  selector: 'app-slide-show',
  imports: [],
  templateUrl: './slide-show.component.html',
  styleUrl: './slide-show.component.scss'
})
export class SlideShowComponent {
  images: string[] = [
    'usagi1.jpg',
    'usagi2.jpg',
    'usagi3.jpg'
  ];
  currentIndex: number = 0;
  intervalId: any;

  ngOnInit() {
    this.startSlideshow();
  }

  startSlideshow() {
    clearInterval(this.intervalId);
    this.intervalId = setInterval(() => {
      this.next(false);
    }, 3000);
  }

  next(reset: boolean = true) {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    if (reset) {
      this.startSlideshow();
    }
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
      this.startSlideshow();
  }
}
