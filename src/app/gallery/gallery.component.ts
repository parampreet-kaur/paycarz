import { Component, OnInit } from '@angular/core';
import { GalleryService } from './gallery.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
  providers: [GalleryService]
})
export class GalleryComponent implements OnInit {
  galleryImages: string[];

  constructor(private galleryService: GalleryService) { }

  ngOnInit() {
    this.galleryImages = this.galleryService.getGalleryImages();
  }

}
