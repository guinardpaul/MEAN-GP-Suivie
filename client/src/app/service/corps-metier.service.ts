import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
// Models
import { CorpsMetier } from '../models/corps-metier';
// Environment variables
import { environment } from '../../environments/environment';

@Injectable()
export class CorpsMetierService {
  private url: string;

  /**
   * Creates an instance of CorpsMetierService.
   * @param {HttpClient} http http module
   * @memberof CorpsMetierService
   */
  constructor(private http: HttpClient) {
    this.url = environment.url;
  }

  getAllCorpsMetier() {
    return this.http.get(`${this.url}/corps-metier`);
  }

  getOneCorpsMetier(id_corps_metier: number): Observable<CorpsMetier> {
    return this.http.get<CorpsMetier>(
      `${this.url}/corps-metier/${id_corps_metier}`
    );
  }

  addCorpsMetier(corpsMetier: CorpsMetier) {
    return this.http.post(`${this.url}/corps-metier`, corpsMetier);
  }

  updateCorpsMetier(corpsMetier: CorpsMetier) {
    return this.http.put(
      `${this.url}/corps-metier/${corpsMetier._id}`,
      corpsMetier
    );
  }

  deleteCorpsMetier(id_corps_metier: number) {
    return this.http.delete(`${this.url}/corps-metier/${id_corps_metier}`);
  }
}
