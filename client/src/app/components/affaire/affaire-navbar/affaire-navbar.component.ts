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

@Component({
  selector: 'app-affaire-navbar',
  templateUrl: './affaire-navbar.component.html',
  styleUrls: ['./affaire-navbar.component.css']
})
export class AffaireNavbarComponent implements OnInit, OnDestroy {
  private id_client: number;
  private _client: Observable<Client>;
  private client: Client;
  private artisansByClientList: Observable<Artisan[]>;
  private subscription: Subscription;

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
