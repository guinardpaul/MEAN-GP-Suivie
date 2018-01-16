import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
// Models
import { CorpsMetier } from '../models/corps-metier';
import { environment } from '../../environments/environment';

@Injectable()
export class CorpsMetierService {
  private url: string;

  /**
   * Creates an instance of CorpsMetierService.
   * @param {Http} http http module
   * @memberof CorpsMetierService
   */
  constructor(private http: Http) {
    this.url = environment.url;
  }

  getAllCorpsMetier() {
    return this.http.get(`${this.url}/corps-metier`).map(res => res.json());
  }

  getOneCorpsMetier(id_corps_metier: number) {
    return this.http
      .get(`${this.url}/corps-metier/${id_corps_metier}`)
      .map(res => res.json());
  }

  addCorpsMetier(corpsMetier: CorpsMetier) {
    return this.http
      .post(`${this.url}/corps-metier`, corpsMetier)
      .map(res => res.json());
  }

  updateCorpsMetier(corpsMetier: CorpsMetier) {
    return this.http
      .put(`${this.url}/corps-metier/${corpsMetier._id}`, corpsMetier)
      .map(res => res.json());
  }

  deleteCorpsMetier(id_corps_metier: number) {
    return this.http
      .delete(`${this.url}/corps-metier/${id_corps_metier}`)
      .map(res => res.json());
  }
}
