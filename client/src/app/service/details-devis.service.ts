import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
// Models
import { DetailsDevis } from '../models/detailsDevis';
// Environment variables
import { environment } from '../../environments/environment';

/**
 *
 * @author Paul GUINARD
 * @export
 * @class DetailsDevisService
 */
@Injectable()
export class DetailsDevisService {
  private url;
  /**
   * Creates an instance of DetailsDevisService.
   * @param {HttpClient} http http module
   * @memberof DetailsDevisService
   */
  constructor(private http: HttpClient) {
    this.url = environment.url;
  }

  /**
   * Get All DetailsDevis By Devis
   *
   * @param {number} id_dev devis._id
   * @returns
   * @memberof DetailsDevisService
   */
  getDetailsDevisByDevis(id_dev: number): Observable<DetailsDevis[]> {
    return this.http.get<DetailsDevis[]>(`${this.url}/details-devis/${id_dev}`);
  }

  /**
   * Create DetailsDevis
   *
   * @param {*} detailsDevis DetailsDevis body
   * @returns
   * @memberof DetailsDevisService
   */
  addDetailsDevis(detailsDevis: DetailsDevis) {
    return this.http.post(`${this.url}/details-devis`, detailsDevis);
  }

  /**
   * Update DetailsDevis
   *
   * @param {DetailsDevis} detailsDevis  DetailsDevis body
   * @returns
   * @memberof DetailsDevisService
   */
  updateDetailsDevis(detailsDevis: DetailsDevis) {
    return this.http.put(
      `${this.url}/details-devis/${detailsDevis._id}`,
      detailsDevis
    );
  }

  /**
   * Delete DetailsDevis
   *
   * @param {number} id detailsDevis._id
   * @returns
   * @memberof DetailsDevisService
   */
  deleteDetailsDevis(id: number) {
    return this.http.delete(`${this.url}/details-devis/${id}`);
  }
}
