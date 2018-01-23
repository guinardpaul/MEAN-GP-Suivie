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

  getAllArtisans(id_client: number) {
    return this.http.get<Artisan[]>(`${this.url}/artisans`).subscribe(
      data => {
        this.dataStore.artisans = data;
        this._artisans.next(Object.assign({}, this.dataStore).artisans);
        // Get Artisans By Client
        this.getAllArtisansByClient(id_client);
      },
      err => {
        console.log(err);
      }
    );
  }

  getAllArtisansAvailable() {}

  // Impossible d'utiliser array.filter car clients est une array
  getAllArtisansByClient(id_client: number) {
    this.dataStore.artisansByClient = [];
    this.dataStore.artisans.forEach((artisan, i) => {
      if (artisan.clients.length > 0) {
        artisan.clients.forEach(id => {
          if (id === id_client) {
            this.dataStore.artisansByClient.push(artisan);
          }
        });
      }
    });

    return this._artisansByClient.next(
      Object.assign({}, this.dataStore).artisansByClient
    );

    /* 
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
      ); */
  }

  addArtisanToAffaire(artisan: Artisan) {
    this.dataStore.artisans.forEach((art, i) => {
      if (art._id === artisan._id) {
        this.dataStore.artisansByClient.push(artisan);
      }
    });

    return this._artisansByClient.next(
      Object.assign({}, this.dataStore).artisansByClient
    );
  }

  removeArtisanToAffaire(artisan: Artisan) {
    this.dataStore.artisans.forEach((art, i) => {
      if (art._id === artisan._id) {
        this.dataStore.artisansByClient.splice(i, 1);
      }
    });

    return this._artisansByClient.next(
      Object.assign({}, this.dataStore).artisansByClient
    );
  }

  getOneArtisan(id_artisan: number): Observable<Artisan> {
    return this.http.get<Artisan>(`${this.url}/artisans/${id_artisan}`);
  }

  addArtisan(artisan: Artisan) {
    return this.http.post(`${this.url}/artisans`, artisan);
  }

  updateArtisan(artisan: Artisan) {
    return this.http.put(`${this.url}/artisans/${artisan._id}`, artisan);
  }

  deleteArtisan(id_artisan: number) {
    return this.http.delete(`${this.url}/artisans/${id_artisan}`);
  }
}
