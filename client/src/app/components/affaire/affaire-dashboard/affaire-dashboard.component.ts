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
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-affaire-dashboard',
  templateUrl: './affaire-dashboard.component.html',
  styleUrls: ['./affaire-dashboard.component.css']
})
export class AffaireDashboardComponent implements OnInit {
  private id_client;
  private _client: Observable<Client>;
  private client: Client;

  constructor(
    private _clientService: ClientService,
    private _artisansService: ArtisansService,
    private _corpsMetierService: CorpsMetierService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

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
    } else {
      this.router.navigate(['/pageNotFound']);
    }
  }
}
