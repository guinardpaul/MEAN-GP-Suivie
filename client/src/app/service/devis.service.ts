import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
// Models
import { Devis } from '../models/devis';
// Environment variables
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { debug } from 'util';

/**
 *
 * @author Paul GUINARD
 * @export DevisService
 * @class DevisService
 */
@Injectable()
export class DevisService {
  private url;
  devisList: Observable<Devis[]>;
  private _devisList: BehaviorSubject<Devis[]>;
  private dataStore: { devisList: Devis[] };

  /**
   * Creates an instance of DevisService.
   * @param {HttpClient} http http module
   * @memberof DevisService devis service
   */
  constructor(private http: HttpClient) {
    this.url = environment.url;
    this.dataStore = { devisList: [] };
    this._devisList = <BehaviorSubject<Devis[]>>new BehaviorSubject([]);
    this.devisList = this._devisList.asObservable();
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
  getAllDevisByClient(client_id: number, artisan_id?: number) {
    let url;
    if (artisan_id === undefined) {
      url = `${this.url}/devis/client/${client_id}`;
    } else {
      url = `${this.url}/devis/client/${client_id}/artisan/${artisan_id}`;
    }

    return this.http.get<Devis[]>(url).subscribe(
      data => {
        this.dataStore.devisList = data;
        this._devisList.next(Object.assign({}, this.dataStore).devisList);
      },
      err => {
        console.log(err);
      }
    );
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
    return this.http.post<any>(`${this.url}/devis`, devis);
    /* .subscribe(
      data => {
        this.dataStore.devisList = [...this.dataStore.devisList, data];
        this._devisList.next(Object.assign({}, this.dataStore).devisList);
      },
      err => {
        console.log(err);
      }
    ); */
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
    return this.http.put<any>(`${this.url}/devis/${devis._id}`, devis);
    /* .subscribe(
        data => {
          this.dataStore.devisList.forEach((dev, i) => {
            if (dev._id === devis._id) {
              this.dataStore.devisList[i] = data;
            }
          });
          this._devisList.next(Object.assign({}, this.dataStore).devisList);
        },
        err => {
          console.log(err);
        }
      ); */
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
    /* .subscribe(data => {
      this.dataStore.devisList.forEach((dev,i) => {
        if(dev._id === id_dev){
          this.dataStore.devisList.splice(i,1)
        }
      })
      this._devisList.next(Object.assign({},this.dataStore).devisList);
    },err => {
      console.log(err);
    }) */
  }
}
