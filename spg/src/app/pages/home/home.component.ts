import { CommonModule } from '@angular/common';
import { NgFor } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { register } from 'swiper/element/bundle';

register(); // Register Swiper custom elements

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NgFor],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('swiper') swiperRef!: ElementRef;

  // List all hero images here:
  heroImages = [
    { src: 'assets/heroes/hero1.jpg', alt: 'Artwork 1' },
    { src: 'assets/heroes/hero2.jpg', alt: 'Artwork 2' }
  ];

  ngAfterViewInit() {
    const swiperEl = this.swiperRef?.nativeElement;
    if (swiperEl) {
      const swiperParams = {
        slidesPerView: 1,
        loop: true,
        effect: 'fade',
        fadeEffect: {
          crossFade: true
        },
        autoplay: {
          delay: 4000,
          disableOnInteraction: false,
        },
        width: null, // Let swiper calculate width automatically
        injectStyles: [
          `
          :host {
            width: 100%;
            height: 100%;
            display: block;
          }
          .swiper {
            width: 100%;
            height: 100%;
          }
          .swiper-slide {
            width: 100% !important;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .swiper-slide img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          `
        ],
      };

      Object.assign(swiperEl, swiperParams);
      swiperEl.initialize();
    }
  }
}
