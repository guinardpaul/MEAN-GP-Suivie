import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
// Models
import { Artisan } from '../models/artisan';
// Environment variables
import { environment } from '../../environments/environment';

@Injectable()
export class ArtisansService {
  private url: string;

  /**
   * Creates an instance of ArtisansService.
   * @param {HttpClient} http http module
   * @memberof ArtisansService
   */
  constructor(private http: HttpClient) {
    this.url = environment.url;
  }

  getAllArtisans() {
    return this.http.get(`${this.url}/artisans`);
  }

  getOneArtisan(id_artisan: number): Observable<Artisan> {
    return this.http.get<Artisan>(`${this.url}/artisans/${id_artisan}`);
  }

  addArtisan(Artisans: Artisan) {
    return this.http.post(`${this.url}/artisans`, Artisans);
  }

  updateArtisan(Artisans: Artisan) {
    return this.http.put(`${this.url}/artisans/${Artisans._id}`, Artisans);
  }

  deleteArtisan(id_artisan: number) {
    return this.http.delete(`${this.url}/artisans/${id_artisan}`);
  }
}
