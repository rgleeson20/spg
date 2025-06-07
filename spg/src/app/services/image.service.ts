import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Image } from '../models/image.model';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  constructor(private http: HttpClient) {}

  getImages(): Observable<Image[]> {
    return this.http.get<Image[]>('assets/images.json');
  }

  getHeroImages(): Observable<Image[]> {
    return this.http.get<Image[]>('assets/images.json').pipe(
      map((images) => images.filter((image) => image.displayOnHomePage))
    );
  }
} 