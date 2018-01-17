import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// Services
import { ClientService } from '../../service/client.service';
// Models
import { Client } from '../../models/client';

@Component({
  selector: 'app-affaire',
  templateUrl: './affaire.component.html',
  styleUrls: ['./affaire.component.css']
})
export class AffaireComponent implements OnInit {
  private id_client;
  private client = new Client();

  constructor(
    private _clientService: ClientService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  getClient(id_client: number) {
    this._clientService.getOneClient(id_client).subscribe(
      data => {
        this.client = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  ngOnInit() {
    if (this.activatedRoute.snapshot.params['id_client'] !== undefined) {
      this.id_client = this.activatedRoute.snapshot.params['id_client'];
      this.getClient(this.id_client);
    } else {
      this.router.navigate(['/pageNotFound']);
    }
  }
}
