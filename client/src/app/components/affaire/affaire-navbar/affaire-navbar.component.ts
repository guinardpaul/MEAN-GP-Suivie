import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// Services
import { ClientService } from '../../../service/client.service';
import { ArtisansService } from '../../../service/artisans.service';
import { CorpsMetierService } from '../../../service/corps-metier.service';
// Models
import { Client } from '../../../models/client';
import { Artisan } from '../../../models/artisan';
import { CorpsMetier } from '../../../models/corps-metier';

@Component({
  selector: 'app-affaire-navbar',
  templateUrl: './affaire-navbar.component.html',
  styleUrls: ['./affaire-navbar.component.css']
})
export class AffaireNavbarComponent implements OnInit {
  private errorLoading = false;
  private id_client;
  private client = new Client();
  private moeList: CorpsMetier[];

  constructor(
    private _clientService: ClientService,
    private _artisansService: ArtisansService,
    private _corpsMetierService: CorpsMetierService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  getClient(id_client: number) {
    this._clientService.getOneClient(id_client).subscribe(
      data => {
        this.client = data;
        this.getMOEByClient(this.client);
      },
      err => {
        console.log(err);
        this.errorLoading = true;
      }
    );
  }

  getMOEByClient(client: Client) {
    this.moeList = [];
    for (const artisan_id in client.moe) {
      if (client.moe.hasOwnProperty(artisan_id)) {
        const element = client.moe[artisan_id];
        this._artisansService.getOneArtisan(client.moe[artisan_id]).subscribe(
          data => {
            this._corpsMetierService
              .getOneCorpsMetier(data.corps_metier)
              .subscribe(
                corpsMetier => {
                  this.moeList.push(corpsMetier);
                },
                err => {
                  console.log(err);
                }
              );
          },
          err => {
            console.log(err);
          }
        );
      }
    }
    console.log(this.moeList);
  }

  ngOnInit() {
    if (this.activatedRoute.snapshot.params['id_client'] !== undefined) {
      this.id_client = this.activatedRoute.snapshot.params['id_client'];
      this.getClient(this.id_client);
    } else {
      this.errorLoading = true;
    }
  }
}
