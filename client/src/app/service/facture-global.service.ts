import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
// Models
import { FactureGlobal } from '../models/factureGlobal';
import { environment } from '../../environments/environment';

/**
 *
 * @author Paul GUINARD
 * @export FactureGlobalService
 * @class FactureGlobalService
 */
@Injectable()
export class FactureGlobalService {
  private url;

  /**
   * Creates an instance of FactureGlobalService.
   * @param {HttpClient} http http module
   * @memberof FactureGlobalService facture global service
   */
  constructor(private http: HttpClient) {
    this.url = environment.url;
  }

  /**
   * GET ALL FACTURE GLOBAL.
   *
   * @returns
   * @memberof FactureGlobalService
   */
  getAllFactureGlobal(): Observable<FactureGlobal[]> {
    return this.http.get<FactureGlobal[]>(`${this.url}/facture-global`);
  }

  /**
   * Get One Facture Global by ID
   *
   * @param {number} id factureGlobal._id
   * @returns
   * @memberof FactureGlobalService
   */
  getOneFactureGlobalById(id: number): Observable<FactureGlobal> {
    return this.http.get<FactureGlobal>(`${this.url}/facture-global/${id}`);
  }

  /**
   * Get All Facture Global by Client.
   *
   * @param {number} id_client client._id
   * @returns
   * @memberof FactureGlobalService
   */
  getAllFactureGlobalByClient(id_client: number): Observable<FactureGlobal[]> {
    return this.http.get<FactureGlobal[]>(
      `${this.url}/facture-global/client/${id_client}`
    );
  }

  /**
   * Get All Facture Global by Devis
   *
   * @param {number} id Devis id
   * @returns
   * @memberof FactureGlobalService
   */
  getAllFactureGlobalByDevis(id: number): Observable<FactureGlobal[]> {
    return this.http.get<FactureGlobal[]>(
      `${this.url}/facture-global/devis/${id}`
    );
  }

  /**
   * Get One Facture Global by ref.
   * Method to check unique key of ref_factureGlobal.
   *
   * @param {number} id_client client id
   * @param {string} ref ref facture global
   * @returns
   * @memberof FactureGlobalService
   */
  getOneFactureGlobalByRef(id_client: number, ref: string): Observable<any> {
    return this.http.get(
      `${this.url}/facture-global/client/${id_client}/ref/${ref}`
    );
  }

  /**
   * Add Facture Global.
   *
   * @param {FactureGlobal} factureGlobal factureGlobal body
   * @returns
   * @memberof FactureGlobalService
   */
  addFactureGlobal(factureGlobal: FactureGlobal): Observable<any> {
    return this.http.post<any>(`${this.url}/facture-global`, factureGlobal);
  }

  /**
   * Update Facture Global.
   *
   * @param {FactureGlobal} factureGlobal factureGlobal body
   * @returns
   * @memberof FactureGlobalService
   */
  updateFactureGlobal(factureGlobal: FactureGlobal) {
    return this.http.put(
      `${this.url}/facture-global/${factureGlobal._id}`,
      factureGlobal
    );
  }

  /**
   * Update Facture Global status
   *
   * @param {FactureGlobal} factureGlobal facture Global body
   * @returns
   * @memberof FactureGlobalService
   */
  updateStatusFactureGlobal(
    factureGlobal: FactureGlobal,
    status_factureGlobal
  ) {
    // Set Status facture Global
    factureGlobal.status_factureGlobal = status_factureGlobal;
    // PUT Request
    return this.http.put(
      `${this.url}/facture-global/${factureGlobal._id}`,
      factureGlobal
    );
  }

  /**
   * Delete Facture Global.
   *
   * @param {number} id_fact factureGlobal._id
   * @returns
   * @memberof FactureGlobalService
   */
  deleteFactureGlobal(id_fact: number) {
    return this.http.delete(`${this.url}/facture-global/${id_fact}`);
  }
}
