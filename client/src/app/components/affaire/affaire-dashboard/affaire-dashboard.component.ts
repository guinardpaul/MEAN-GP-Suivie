import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
// Services
import { ClientService } from '../../../service/client.service';
import { ArtisansService } from '../../../service/artisans.service';
import { CorpsMetierService } from '../../../service/corps-metier.service';
import { FactureGlobalService } from '../../../service/facture-global.service';
// Models
import { Client } from '../../../models/client';
import { Artisan } from '../../../models/artisan';
import { CorpsMetier } from '../../../models/corps-metier';
import { AffaireDashboardData } from '../../../models/affaire-dashboard';
// Environment
import * as config from '../../../../environments/config';
import { $ } from 'protractor';

@Component({
  selector: 'app-affaire-dashboard',
  templateUrl: './affaire-dashboard.component.html',
  styleUrls: ['./affaire-dashboard.component.css']
})
export class AffaireDashboardComponent implements OnInit {
  /**
   * client id
   * @type {number}
   */
  private id_client: number;

  /**
   * Observable du client
   * @type {Observable<Client>}
   */
  private _client: Observable<Client>;

  /**
   * Current client visionné
   * @type {Client}
   */
  private client: Client;

  /**
   * List client
   * @type {Observable<Artisan[]>}
   */
  private clientArtisansList: Observable<Artisan[]>;

  /**
   * GP Data traité comme un artisan
   * @type {Artisan}
   */
  private artisan: Artisan;

  /**
   * Array utilisé pour le tableau récapitulatif
   * @type {AffaireDashboardData[]}
   */
  private artisanData: AffaireDashboardData[];

  /**
   * Artisan liste
   * @type {Artisan[]}
   */
  artisansList: Artisan[];

  /**
   * GP data traitee comme un Artisan
   * @type {Artisan}
   */
  GPArtisan: Artisan;

  /**
   * processing
   */
  private processed = false;

  constructor(
    private _clientService: ClientService,
    private _artisansService: ArtisansService,
    private _corpsMetierService: CorpsMetierService,
    private _factureGlobalService: FactureGlobalService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.artisansList = [];
    this.artisanData = [];
    this.artisan = new Artisan();
  }

  /**
   * Get One artisan by ID
   *
   * @param {*} id_artisan artisan ID
   */
  getArtisanData(id_artisan: any) {
    return this._artisansService.getOneArtisan(id_artisan).subscribe(
      data => {
        this.GPArtisan = data;
        this.artisansList.push(data);
      },
      err => console.log(err)
    );
  }

  /**
   * get Artisan data et cree AffaireDashboardData pour afficher les données du tableau
   *
   * @param {number} client_id client ID
   * @param {Artisan[]} artisansList Liste Artisan[]
   */
  getAllFactureGlobalByArtisanID(client_id: number, artisansList: Artisan[]) {
    this.artisanData = new Array<AffaireDashboardData>();
    for (let i = 0; i < artisansList.length; i++) {
      const artisan = artisansList[i];
      let montantTotalTTC = 0;
      let montantFactureTTC = 0;
      let montantRegle = 0;

      this._factureGlobalService
        .getAllFactureGlobalByClient(client_id, artisan._id)
        .subscribe(
          data => {
            data.map(factures => {
              montantTotalTTC += factures.montantTtcTotal;
              montantFactureTTC += factures.montantTtcFacture;
              montantRegle += factures.montantTtcRegle;
            });

            let status_artisan = false;
            if (montantFactureTTC === montantRegle) {
              status_artisan = true;
            }

            const artisanData = new AffaireDashboardData({
              artisan_id: artisan._id,
              status: status_artisan,
              artisan_corps_metier: artisan.corps_metier,
              montantTotalTTC: montantTotalTTC,
              montantFactureTTC: montantFactureTTC,
              montantRegle: montantRegle
            });

            this.artisanData.push(artisanData);
          },
          err => console.log(err)
        );
    }
    this.processed = true;
  }

  ngOnInit() {
    // get id_client des route params et charge le client
    if (this.activatedRoute.snapshot.params['id_client'] !== undefined) {
      this.id_client = this.activatedRoute.snapshot.params['id_client'];

      this._client = this._clientService.client;
      const subscription = this._client.subscribe(
        data => {
          this.client = data;
        },
        err => {
          console.log(err);
        }
      );

      this._artisansService.artisansWithGP.subscribe(
        data => {
          this.artisansList = data;
          setTimeout(() => {
            this.getAllFactureGlobalByArtisanID(
              this.id_client,
              this.artisansList
            );
          }, 1500);
        },
        err => console.log(err)
      );
    } else {
      this.router.navigate(['/pageNotFound']);
    }
  }
}
