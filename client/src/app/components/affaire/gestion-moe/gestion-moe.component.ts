import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
// Services
import { ArtisansService } from '../../../service/artisans.service';
import { ClientService } from '../../../service/client.service';
// Models
import { Artisan } from '../../../models/artisan';
import { Client } from 'app/models/client';

@Component({
  selector: 'app-gestion-moe',
  templateUrl: './gestion-moe.component.html',
  styleUrls: ['./gestion-moe.component.css']
})
export class GestionMoeComponent implements OnInit {
  /**
   * Observable de la Liste des artisans par client
   *
   * @private
   * @type {Observable<Artisan[]>}
   * @memberof GestionMoeComponent
   */
  private clientArtisansList: Observable<Artisan[]>;

  /**
   * Observable de la liste des artisans
   *
   * @private
   * @type {Observable<Artisan[]>}
   * @memberof GestionMoeComponent
   */
  private artisansList: Observable<Artisan[]>;

  /**
   * Observable du client
   *
   * @private
   * @type {Observable<Client>}
   * @memberof GestionMoeComponent
   */
  private _client: Observable<Client>;

  /**
   * Client object
   *
   * @private
   * @memberof GestionMoeComponent
   */
  private client = new Client();

  /**
   * Artisan a ajouter au client
   *
   * @private
   * @memberof GestionMoeComponent
   */
  private artisanToAdd = new Artisan();

  /**
   * Artisan a enlever au client
   *
   * @private
   * @memberof GestionMoeComponent
   */
  private artisanToRemove = new Artisan();

  /**
   * Creates an instance of GestionMoeComponent.
   * @param {ArtisansService} _artisansService artisan service
   * @param {ClientService} _clientService client service
   * @memberof GestionMoeComponent
   */
  constructor(
    private _artisansService: ArtisansService,
    private _clientService: ClientService
  ) {}

  /**
   * Select artisan a enlever listener
   *
   * @param {Artisan} artisan Artisan object
   * @memberof GestionMoeComponent
   */
  selectArtisanToRemove(artisan: Artisan) {
    this.artisanToRemove = artisan;
  }

  /**
   * Select artisan a ajouter listener
   *
   * @param {Artisan} artisan
   * @memberof GestionMoeComponent
   */
  selectArtisanToAdd(artisan: Artisan) {
    this.artisanToAdd = artisan;
  }

  /**
   * Ajoute @param artisanToAdd au client
   *
   * @memberof GestionMoeComponent
   */
  addArtisanToAffaire() {
    this._artisansService.addArtisanToAffaire(this.artisanToAdd);
    this.artisanToAdd = new Artisan();
  }

  /**
   * Enleve @param artisanToRemove au client
   *
   * @memberof GestionMoeComponent
   */
  removeArtisanToAffaire() {
    this._artisansService.removeArtisanToAffaire(this.artisanToRemove);
    this.artisanToRemove = new Artisan();
  }

  /**
   * Sauve les modifications a la BDD
   *
   * @memberof GestionMoeComponent
   */
  sauverModifications() {
    this._artisansService.updateArtisansToAffaire(this.client._id);
  }

  ngOnInit() {
    this.clientArtisansList = this._artisansService.artisansByClient;
    this.artisansList = this._artisansService.artisans;
    this._client = this._clientService.client;
    const subscribe = this._client
      .subscribe(data => (this.client = data))
      .unsubscribe();
  }
}
