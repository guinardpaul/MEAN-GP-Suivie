import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
// Models
import { FactureAccompte } from '../models/factureAccompte';
// Environment variables
import { environment } from '../../environments/environment';

/**
 *
 * @author Paul GUINARD
 * @export FactureAccompteService
 * @class FactureAccompteService
 */
@Injectable()
export class FactureAccompteService {
  private url;

  /**
   * Creates an instance of FactureAccompteService.
   * @param {HttpClient} http http module
   * @memberof FactureAccompteService factureAccompte service
   */
  constructor(private http: HttpClient) {
    this.url = environment.url;
  }

  /**
   * Get All Facture Accompte.
   *
   * @returns
   * @memberof FactureAccompteService
   */
  getAllFactureAccompte(): Observable<FactureAccompte[]> {
    return this.http.get<FactureAccompte[]>(`${this.url}/facture-accompte`);
  }

  /**
   * Get All Facture Accompte by factureGlobal.
   *
   * @param {number} id_fact factureGlobal._id
   * @returns
   * @memberof FactureAccompteService
   */
  getAllFactureAccompteByFactureGlobal(
    id_fact: number
  ): Observable<FactureAccompte[]> {
    return this.http.get<FactureAccompte[]>(
      `${this.url}/facture-accompte/facture-global/${id_fact}`
    );
  }

  /**
   * Get One Facture Accompte by Id.
   *
   * @param {number} id factureAccompte._id
   * @returns
   * @memberof FactureAccompteService
   */
  getOneFactureAccompte(id: number): Observable<FactureAccompte> {
    return this.http.get<FactureAccompte>(`${this.url}/facture-accompte/${id}`);
  }

  /**
   * Get One Facture accompte by ref.
   * Method to check unique key of ref_factureAccompte.
   *
   * @param {number} id_factureGlobal facture global id
   * @param {any} ref_factureAccompte facture accompte ref
   * @returns
   * @memberof FactureAccompteService
   */
  getOneFactureAccompteByRef(
    id_factureGlobal: number,
    ref_factureAccompte
  ): Observable<any> {
    return this.http.get<any>(
      `${
        this.url
      }/facture-accompte/facture-global/${id_factureGlobal}/ref/${ref_factureAccompte}`
    );
  }

  /**
   * Add Facture Accompte.
   *
   * @param {*} factureAccompte factureAccompte body
   * @returns
   * @memberof FactureAccompteService
   */
  addFactureAccompte(factureAccompte: any): Observable<any> {
    return this.http.post<any>(`${this.url}/facture-accompte`, factureAccompte);
  }

  /**
   * Update Facture Accompte.
   *
   * @param {FactureAccompte} factureAccompte factureAccompte body
   * @returns
   * @memberof FactureAccompteService
   */
  updateFactureAccompte(factureAccompte: FactureAccompte): Observable<any> {
    return this.http.put<any>(
      `${this.url}/facture-accompte/${factureAccompte._id}`,
      factureAccompte
    );
  }

  /**
   * Update Facture Accompte status
   *
   * @param {FactureAccompte} factureAccompte facture Accompte body
   * @returns
   * @memberof FactureAccompteService
   */
  updateStatusFactureAccompte(
    factureAccompte: FactureAccompte,
    status_factureAccompte
  ) {
    // Set status facture accompte
    factureAccompte.status_factureAccompte = status_factureAccompte;
    // PUT request
    return this.http.put(
      `${this.url}/facture-accompte/${factureAccompte._id}`,
      factureAccompte
    );
  }

  /**
   * Delete Facture Accompte.
   *
   * @param {number} id factureAccompte._id
   * @returns
   * @memberof FactureAccompteService
   */
  deleteFactureAccompte(id: number): Observable<any> {
    return this.http.delete<any>(`${this.url}/facture-accompte/${id}`);
  }
}
