import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { ArtisansService } from '../../../service/artisans.service';
import { ClientService } from '../../../service/client.service';

import { Artisan } from '../../../models/artisan';
import { Client } from 'app/models/client';

@Component({
  selector: 'app-gestion-moe',
  templateUrl: './gestion-moe.component.html',
  styleUrls: ['./gestion-moe.component.css']
})
export class GestionMoeComponent implements OnInit {
  private clientArtisansList: Observable<Artisan[]>;
  // Ne mettre seulement les artisans non présent à l'affaire
  private artisansList: Observable<Artisan[]>;
  private _client: Observable<Client>;
  private client = new Client();
  private artisanToAdd = new Artisan();
  private artisanToRemove = new Artisan();

  constructor(
    private _artisansService: ArtisansService,
    private _clientService: ClientService
  ) {}

  selectArtisanToRemove(artisan: Artisan) {
    this.artisanToRemove = artisan;
  }

  selectArtisanToAdd(artisan: Artisan) {
    this.artisanToAdd = artisan;
  }

  addArtisanToAffaire() {
    this._artisansService.addArtisanToAffaire(this.artisanToAdd);
  }

  removeArtisanToAffaire() {
    this._artisansService.removeArtisanToAffaire(this.artisanToRemove);
  }

  updateClient(client: Client) {
    console.log(client);
  }

  ngOnInit() {
    this.clientArtisansList = this._artisansService.artisansByClient;
    this.artisansList = this._artisansService.artisans;
    this._client = this._clientService.client;
    const subscribe = this._client.subscribe(data => (this.client = data));
  }
}
