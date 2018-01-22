import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ArtisansService } from '../../../service/artisans.service';
import { Artisan } from '../../../models/artisan';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-gestion-moe',
  templateUrl: './gestion-moe.component.html',
  styleUrls: ['./gestion-moe.component.css']
})
export class GestionMoeComponent implements OnInit {
  private clientArtisansList: Observable<Artisan[]>;
  private artisansList: Observable<Artisan[]>;

  constructor(private _artisansService: ArtisansService) {}

  ngOnInit() {
    this.clientArtisansList = this._artisansService.artisansByClient;
    this.artisansList = this._artisansService.artisans;
  }
}
