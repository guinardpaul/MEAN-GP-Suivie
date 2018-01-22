import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
// Models
import { Artisan } from '../models/artisan';
// Environment variables
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ArtisansService {
  private url: string;
  // UTILISER FILTRE ?
  artisansByClient: Observable<Artisan[]>;
  artisans: Observable<Artisan[]>;
  private _artisansByClient: BehaviorSubject<Artisan[]>;
  private _artisans: BehaviorSubject<Artisan[]>;
  private dataStore: { artisansByClient: Artisan[]; artisans: Artisan[] };

  /**
   * Creates an instance of ArtisansService.
   * @param {HttpClient} http http module
   * @memberof ArtisansService
   */
  constructor(private http: HttpClient) {
    this.url = environment.url;
    this.dataStore = { artisansByClient: [], artisans: [] };
    this._artisansByClient = <BehaviorSubject<Artisan[]>>new BehaviorSubject(
      []
    );
    this.artisansByClient = this._artisansByClient.asObservable();
    this._artisans = <BehaviorSubject<Artisan[]>>new BehaviorSubject([]);
    this.artisans = this._artisans.asObservable();
  }

  getAllArtisans() {
    return this.http.get<Artisan[]>(`${this.url}/artisans`).subscribe(
      data => {
        this.dataStore.artisans = data;
        console.log(this.dataStore);
        this._artisans.next(Object.assign({}, this.dataStore).artisans);
      },
      err => {
        console.log(err);
      }
    );
  }

  getAllArtisansByClient(id_client: number) {
    return this.http
      .get<Artisan[]>(`${this.url}/artisans/client/${id_client}`)
      .subscribe(
        data => {
          this.dataStore.artisansByClient = data;
          console.log(this.dataStore);
          this._artisansByClient.next(
            Object.assign({}, this.dataStore).artisansByClient
          );
        },
        err => {
          console.log(err);
        }
      );
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
