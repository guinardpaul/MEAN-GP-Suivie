import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// Services
import { ClientService } from '../../service/client.service';
import { ArtisansService } from '../../service/artisans.service';
// Models
import { Client } from '../../models/client';

@Component({
  selector: 'app-affaire',
  templateUrl: './affaire.component.html',
  styleUrls: ['./affaire.component.css']
})
export class AffaireComponent implements OnInit {
  /**
   * client ID
   *
   * @private
   * @type {number}
   * @memberof AffaireComponent
   */
  private id_client: number;

  /**
   * Creates an instance of AffaireComponent.
   * @param {ClientService} _clientService client service
   * @param {ArtisansService} _artisansService artisan service
   * @param {ActivatedRoute} activatedRoute activated router
   * @memberof AffaireComponent
   */
  constructor(
    private _clientService: ClientService,
    private _artisansService: ArtisansService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    if (this.activatedRoute.snapshot.params['id_client'] !== undefined) {
      this.id_client = this.activatedRoute.snapshot.params['id_client'];

      this._clientService.getClient(this.id_client);
      this._artisansService.getAllArtisans(this.id_client);
    }
  }
}
