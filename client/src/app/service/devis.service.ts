import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
// Models
import { Devis } from '../models/devis';
// Environment variables
import { environment } from '../../environments/environment';

/**
 *
 * @author Paul GUINARD
 * @export DevisService
 * @class DevisService
 */
@Injectable()
export class DevisService {
  private url;

  /**
   * Creates an instance of DevisService.
   * @param {HttpClient} http http module
   * @memberof DevisService devis service
   */
  constructor(private http: HttpClient) {
    this.url = environment.url;
  }

  /**
   * Get All Devis.
   *
   * @returns devis
   * @memberof DevisService
   */
  getAllDevis(): Observable<Devis[]> {
    return this.http.get<Devis[]>(`${this.url}/devis`);
  }

  /* getAllValidDevis(): Observable<Devis> {
    return this.http.get(devUrl)
      .flatMap(res => res.json())
      .filter(dev => dev[1].valid)
      .map(dev => dev.json());
  } */

  /**
   * Get All Devis By Client.
   *
   * @param {number} client_id client._id
   * @returns
   * @memberof DevisService
   */
  getAllDevisByClient(client_id: number): Observable<Devis[]> {
    return this.http.get<Devis[]>(`${this.url}/devis/client/${client_id}`);
  }

  /**
   * Get one devis.
   *
   * @param {number} id devis._id
   * @returns
   * @memberof DevisService
   */
  getOneDevis(id: number): Observable<Devis> {
    return this.http.get<Devis>(`${this.url}/devis/${id}`);
  }

  /**
   * Get One Devis by ref.
   * Method to check unique key of ref_devis.
   *
   * @param {number} id_client client id
   * @param {number} ref_devis ref devis
   * @returns
   * @memberof DevisService
   */
  getOneDevisByRef(id_client: number, ref_devis: number): Observable<any> {
    return this.http.get(
      `${this.url}/devis/client/${id_client}/ref/${ref_devis}`
    );
  }

  /**
   * Add Devis.
   *
   * @param {any} devis devis body
   * @returns
   * @memberof DevisService
   */
  addDevis(devis: Devis) {
    return this.http.post(`${this.url}/devis`, devis);
  }

  /**
   * Update Devis.
   *
   * @param {any} devis devis body
   * @param {number} id_dev devis._id
   * @returns
   * @memberof DevisService
   */
  updateDevis(devis: Devis) {
    return this.http.put(`${this.url}/devis/${devis._id}`, devis);
  }

  /**
   * Delete devis.
   *
   * @param {number} id_dev devis._id
   * @returns
   * @memberof DevisService
   */
  deleteDevis(id_dev: number) {
    return this.http.delete(`${this.url}/devis/${id_dev}`);
  }
}
