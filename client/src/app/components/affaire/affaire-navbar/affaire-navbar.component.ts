import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
// Services
import { ClientService } from '../../../service/client.service';
import { ArtisansService } from '../../../service/artisans.service';
import { CorpsMetierService } from '../../../service/corps-metier.service';
// Models
import { Client } from '../../../models/client';
import { Artisan } from '../../../models/artisan';
import { CorpsMetier } from '../../../models/corps-metier';
import { Subscription } from 'rxjs/Subscription';
// Env const
import * as config from '../../../../environments/config';

@Component({
  selector: 'app-affaire-navbar',
  templateUrl: './affaire-navbar.component.html',
  styleUrls: ['./affaire-navbar.component.css']
})
export class AffaireNavbarComponent implements OnInit, OnDestroy {
  /**
   * Client ID
   *
   * @type {number}
   * @memberof AffaireNavbarComponent
   */
  private id_client: number;

  /**
   * Observable du client
   *
   * @private
   * @type {Observable<Client>}
   * @memberof AffaireNavbarComponent
   */
  private _client: Observable<Client>;

  /**
   * Client data
   *
   * @private
   * @type {Client}
   * @memberof AffaireNavbarComponent
   */
  private client: Client;

  /**
   * Liste des artisans par client
   *
   * @private
   * @type {Observable<Artisan[]>}
   * @memberof AffaireNavbarComponent
   */
  private artisansByClientList: Observable<Artisan[]>;

  /**
   * Subscription aux Observable
   *
   * @private
   * @type {Subscription}
   * @memberof AffaireNavbarComponent
   */
  private subscription: Subscription;

  /**
   * GP Artisan ID
   *
   * @private
   * @memberof AffaireNavbarComponent
   */
  private id_GP = config.GP_ID;

  /**
   * Creates an instance of AffaireNavbarComponent.
   * @param {ClientService} _clientService client service
   * @param {ArtisansService} _artisansService artisan service
   * @param {ActivatedRoute} activatedRoute activated route
   * @memberof AffaireNavbarComponent
   */
  constructor(
    private _clientService: ClientService,
    private _artisansService: ArtisansService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    if (this.activatedRoute.snapshot.params['id_client'] !== undefined) {
      this.id_client = this.activatedRoute.snapshot.params['id_client'];

      this._client = this._clientService.client;
      this.subscription = this._client.subscribe(
        data => {
          this.client = data;
        },
        err => {
          console.log(err);
        }
      );

      this.artisansByClientList = this._artisansService.artisansByClientNavBar;
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
