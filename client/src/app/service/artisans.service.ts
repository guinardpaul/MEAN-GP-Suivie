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

  // Impossible d'utiliser array.filter car clients est une array
  // vraiment impossible ?
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
    this.getAllArtisansAvailable();
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

  getAllArtisansAvailable() {
    this.dataStore.artisans = this.dataStore.artisans.filter(function(art) {
      return this.indexOf(art) < 0;
    }, this.dataStore.artisansByClient);

    this._artisans.next(Object.assign({}, this.dataStore).artisans);
  }

  // Push artisan from dataStore.artisans correspondant à @param artisan
  addArtisanToAffaire(artisan: Artisan) {
    this.dataStore.artisans.forEach((art, i) => {
      if (art._id === artisan._id) {
        this.dataStore.artisansByClient.push(artisan);
      }
    });
    // Update dataStore.artisans list with filter
    this.getAllArtisansAvailable();

    return this._artisansByClient.next(
      Object.assign({}, this.dataStore).artisansByClient
    );
  }

  // Splice artisan from dataStore.artisansByClient correspondant à @param artisan
  // &
  // Push artisan from dataStore.artisansByClient to dataStore.artisans
  removeArtisanToAffaire(artisan: Artisan) {
    this.dataStore.artisansByClient.forEach((art, i) => {
      if (art._id === artisan._id) {
        this.dataStore.artisansByClient.splice(i, 1);
        this.dataStore.artisans.push(art);
      }
    });

    this._artisansByClient.next(
      Object.assign({}, this.dataStore).artisansByClient
    );
    this._artisans.next(Object.assign({}, this.dataStore).artisans);
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

  updateArtisansToAffaire(id_client: number) {
    // Update artisansByClient list
    this.dataStore.artisansByClient.forEach((artisan, i) => {
      // Check si id_client n'est pas déjà lié à artisan
      if (!artisan.clients.includes(id_client)) {
        artisan.clients.push(id_client);
        this.http
          .put<Artisan>(`${this.url}/artisans/${artisan._id}`, artisan)
          .subscribe(data => {
            if (data._id === artisan._id) {
              this.dataStore.artisansByClient[i] = data;
            }
          });
      }
    });

    // Update artisans list
    this.dataStore.artisans.forEach((artisan, i) => {
      // Check si id_client est lié à artisan
      if (artisan.clients.includes(id_client)) {
        artisan.clients.splice(artisan.clients.indexOf(id_client), 1);
        this.http
          .put<Artisan>(`${this.url}/artisans/${artisan._id}`, artisan)
          .subscribe(data => {
            if (data._id === artisan._id) {
              this.dataStore.artisans[i] = data;
            }
          });
      }
    });

    this._artisans.next(Object.assign({}, this.dataStore).artisans);

    this._artisansByClient.next(
      Object.assign({}, this.dataStore).artisansByClient
    );
  }

  deleteArtisan(id_artisan: number) {
    return this.http.delete(`${this.url}/artisans/${id_artisan}`);
  }
}
