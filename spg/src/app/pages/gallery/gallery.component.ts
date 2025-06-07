import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageService } from '../../services/image.service';
import { Image } from '../../models/image.model';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  images: Image[] = [];
  selectedImage: Image | null = null;

  constructor(private imageService: ImageService) {}

  ngOnInit(): void {
    this.imageService.getImages().subscribe((images) => {
      this.images = images;
    });
  }

  openImage(image: Image): void {
    this.selectedImage = image;
  }

  closeImage(): void {
    this.selectedImage = null;
  }

  previousImage(event: Event): void {
    event.stopPropagation();
    if (!this.selectedImage) return;
    
    const currentIndex = this.images.findIndex(img => img === this.selectedImage);
    if (currentIndex > 0) {
      this.selectedImage = this.images[currentIndex - 1];
    } else {
      // Wrap to the end if at the beginning
      this.selectedImage = this.images[this.images.length - 1];
    }
  }

  nextImage(event: Event): void {
    event.stopPropagation();
    if (!this.selectedImage) return;
    
    const currentIndex = this.images.findIndex(img => img === this.selectedImage);
    if (currentIndex < this.images.length - 1) {
      this.selectedImage = this.images[currentIndex + 1];
    } else {
      // Wrap to the beginning if at the end
      this.selectedImage = this.images[0];
    }
  }
}
