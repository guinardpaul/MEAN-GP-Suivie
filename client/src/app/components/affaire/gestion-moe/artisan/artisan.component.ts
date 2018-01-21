import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { ArtisansService } from '../../../../service/artisans.service';
import { FlashMessagesService } from 'ngx-flash-messages';

import { Artisan } from '../../../../models/artisan';

@Component({
  selector: 'app-artisan',
  templateUrl: './artisan.component.html',
  styleUrls: ['./artisan.component.css']
})
export class ArtisanComponent implements OnInit {
  private artisanForm: FormGroup;
  private artisan = new Artisan();
  private processing = false;

  constructor(
    private _artisansService: ArtisansService,
    private flashMsg: FlashMessagesService,
    private _fb: FormBuilder,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {
    this.generateForm();
  }

  addArtisan() {
    this.artisan = this.artisanForm.value;

    this._artisansService.addArtisan(this.artisan).subscribe(
      data => {
        console.log(data);
        this.artisan = new Artisan();
      },
      err => {
        console.log(err);
      }
    );
  }

  onCancel() {
    this._router.navigate([
      'affaire',
      this._activatedRoute.root.snapshot.children[0].params['id_client'],
      'gestion-moe'
    ]);
  }

  generateForm() {
    this.artisanForm = this._fb.group({
      civilite: '',
      nom_societe: ['', Validators.compose([Validators.required])],
      corps_metier: ['', Validators.compose([Validators.required])],
      nom: ['', Validators.compose([this.nomPrenomValidation])],
      prenom: ['', Validators.compose([this.nomPrenomValidation])],
      email: [
        '',
        Validators.compose([Validators.required, this.emailValidation])
      ],
      numTel: [
        '',
        Validators.compose([
          Validators.required,
          this.numTelValidation,
          Validators.minLength(10)
        ])
      ],
      adresse: '',
      complAdresse: '',
      cp: '',
      ville: ''
    });
  }

  // Input Validation
  /**
   * nom et prenom validation using RegExp
   *
   * @param {any} controls
   * @returns
   * @memberof ArtisanComponent
   */
  nomPrenomValidation(controls) {
    const regExp = new RegExp(/[a-zA-z-_éè]+$/);
    if (regExp.test(controls.value)) {
      return null;
    }
    return {
      nomPrenomValidation: true
    };
  }

  /**
   * email validation using RegExp
   *
   * @param {any} controls
   * @returns
   * @memberof ArtisanComponent
   */
  emailValidation(controls) {
    const regExp = new RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    if (regExp.test(controls.value)) {
      return null;
    }
    return {
      emailValidation: true
    };
  }

  /**
   * num tel validation using RegExp
   *
   * @param {any} controls
   * @returns
   * @memberof ArtisanComponent
   */
  numTelValidation(controls) {
    const regExp = new RegExp(/[0-9-_.]+$/);
    if (regExp.test(controls.value)) {
      return null;
    }
    return {
      numTelValidation: true
    };
  }

  ngOnInit() {}
}
