import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
// Models
import { Artisan } from '../models/artisan';
import { environment } from '../../environments/environment';

@Injectable()
export class ArtisansService {
  private url: string;

  /**
   * Creates an instance of ArtisansService.
   * @param {Http} http http module
   * @memberof ArtisansService
   */
  constructor(private http: Http) {
    this.url = environment.url;
  }

  getAllArtisans() {
    return this.http.get(`${this.url}/artisans`).map(res => res.json());
  }

  getOneArtisan(id_artisan: number) {
    return this.http
      .get(`${this.url}/artisans/${id_artisan}`)
      .map(res => res.json());
  }

  addArtisan(Artisans: Artisan) {
    return this.http
      .post(`${this.url}/artisans`, Artisans)
      .map(res => res.json());
  }

  updateArtisan(Artisans: Artisan) {
    return this.http
      .put(`${this.url}/artisans/${Artisans._id}`, Artisans)
      .map(res => res.json());
  }

  deleteArtisan(id_artisan: number) {
    return this.http
      .delete(`${this.url}/artisans/${id_artisan}`)
      .map(res => res.json());
  }
}
