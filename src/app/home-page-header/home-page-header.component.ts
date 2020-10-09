import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page-header',
  templateUrl: './home-page-header.component.html',
  styleUrls: ['./home-page-header.component.scss']
})
export class HomePageHeaderComponent implements OnInit {

  slideIndex = 1;
  constructor() { }

  ngOnInit() {
    let sliderImages = document.getElementsByClassName('.slide-image');
    this.showDivs(this.slideIndex);
  }

  plusDivs(n: number) {
    this.showDivs(this.slideIndex += n);
  }
  
  currentDiv(n: number) {
    this.showDivs(this.slideIndex = n);
  }
  
  showDivs(n: number) {
    var image = document.getElementsByClassName("my-slides");
    var dots = document.getElementsByClassName("demo");
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
  }

}
