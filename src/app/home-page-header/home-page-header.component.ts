import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page-header',
  templateUrl: './home-page-header.component.html',
  styleUrls: ['./home-page-header.component.scss'],
  animations: [
    trigger('divState', [
      state('normal', style({
        transform: 'translateX(50px)'
      })),
      state('normal2', style({
        transform: 'translateX(-50px)'
      })),
      state('move', style({
        transform: 'translateX(0px)'
      })),
      transition('normal => move', animate(300)),
      transition('normal2 => move', animate(300))
    ])
  ]
})
export class HomePageHeaderComponent implements OnInit, OnDestroy {

  state="move";
  timer: any;
  slideIndex = 1;
  constructor() { }

  ngOnInit() {
    let sliderImages = document.getElementsByClassName('.slide-image');
    this.showDivs(this.slideIndex);
    this.timer = setInterval(() => {
      this.plusDivs(1, 'right');
    }, 7000);
  }

  changeState(direction?: string){
    if(direction === 'right')
    {
      this.state = 'normal';
      setTimeout(() => {
        this.state = 'move';
      }, 50);
    }
    else if(direction === 'left')
    {
      this.state = 'normal2';
      setTimeout(() => {
        this.state = 'move';
      }, 50);
    }
    
  }

  plusDivs(n: number, direction: string) {
    this.showDivs(this.slideIndex += n, direction);
  }
  
  currentDiv(n: number) {
    this.showDivs(this.slideIndex = n);
  }
  
  showDivs(n: number, direction?: string) {
    var image = document.getElementsByClassName("my-slides");
    var dots = document.getElementsByClassName("circle");
    if (n > image.length) {this.slideIndex = 1}
    if (n < 1) {this.slideIndex = image.length}
    for (let i = 0; i < image.length; i++) {
      image[i].classList.add('d-none'); 
      image[i].classList.remove('d-block'); 
    }
    for (let i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" bg-white", "");
    }
    image[this.slideIndex-1].classList.add('d-block'); 
    image[this.slideIndex-1].classList.remove('d-none');
    dots[this.slideIndex-1].className += " bg-white";
    this.changeState(direction);
  }

  ngOnDestroy(){
    clearInterval(this.timer);
  }

}
