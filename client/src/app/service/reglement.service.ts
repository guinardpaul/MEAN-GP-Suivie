import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
// Models
import { Reglement } from '../models/reglement';
// Environement variables
import { environment } from '../../environments/environment';

/**
 *
 * @author Paul GUINARD
 * @export
 * @class ReglementService
 */
@Injectable()
export class ReglementService {
  private url;

  /**
   * Creates an instance of ReglementService.
   * @param {HttpClient} http http module
   * @memberof ReglementService
   */
  constructor(private http: HttpClient) {
    this.url = environment.url;
  }

  /**
   * Get All Reglement by FactureAccompte._id
   *
   * @param {number} id FactureAccompte._id
   * @returns
   * @memberof ReglementService
   */
  getReglementByFactureAccompte(id: number): Observable<Reglement[]> {
    return this.http.get<Reglement[]>(`${this.url}/reglements/${id}`);
  }

  /**
   * Save Reglement
   *
   * @param {*} reglement body
   * @returns
   * @memberof ReglementService
   */
  addReglement(reglement: any): Observable<any> {
    return this.http.post<any>(`${this.url}/reglements`, reglement);
  }

  /**
   * Update reglement
   *
   * @param {Reglement} reglement body
   * @returns
   * @memberof ReglementService
   */
  updateReglement(reglement: Reglement) {
    return this.http.put(`${this.url}/reglements/${reglement._id}`, reglement);
  }

  /**
   * Delete reglement
   *
   * @param {number} id reglement._id
   * @returns
   * @memberof ReglementService
   */
  deleteReglement(id: number): Observable<any> {
    return this.http.delete<any>(`${this.url}/reglements/${id}`);
  }
}
