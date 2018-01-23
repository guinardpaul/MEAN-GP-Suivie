import { Component, OnInit } from '@angular/core';
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
import { empty } from 'rxjs/Observer';

@Component({
  selector: 'app-affaire-navbar',
  templateUrl: './affaire-navbar.component.html',
  styleUrls: ['./affaire-navbar.component.css']
})
export class AffaireNavbarComponent implements OnInit {
  private id_client: number;
  private _client: Observable<Client>;
  private client: Client;
  private artisansList: Observable<Artisan[]>;
  private errorLoading = false;

  constructor(
    private _clientService: ClientService,
    private _artisansService: ArtisansService,
    private _corpsMetierService: CorpsMetierService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  getMOEByClient(id_client: number) {
    this.artisansList = this._artisansService.artisansByClient;
  }

  ngOnInit() {
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

      this.getMOEByClient(this.id_client);
    }
  }
}
