import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
// Services
import { ArtisansService } from '../../../../service/artisans.service';
import { FlashMessagesService } from 'ngx-flash-messages';
// Models
import { CIVILITE } from '../../../../models/civilite.enum';
import { Artisan } from '../../../../models/artisan';
import {
  GP_flash_messages,
  GP_flash_config
} from '../../../../models/constants/GP-messages-utils';

@Component({
  selector: 'app-artisan',
  templateUrl: './artisan.component.html',
  styleUrls: ['./artisan.component.css']
})
export class ArtisanComponent implements OnInit {
  /**
   * Artisan form builder
   *
   * @private
   * @type {FormGroup}
   * @memberof ArtisanComponent
   */
  private artisanForm: FormGroup;

  /**
   * Artisan
   *
   * @private
   * @memberof ArtisanComponent
   */
  private artisan = new Artisan();

  /**
   * processing attribut pour charger la vue
   *
   * @private
   * @memberof ArtisanComponent
   */
  private processing = false;

  /**
   * Artisan ID
   *
   * @private
   * @type {*}
   * @memberof ArtisanComponent
   */
  private id_artisan: any;

  /**
   * keys pour select CIVILITE
   *
   * @private
   * @type {any[]}
   * @memberof ArtisanComponent
   */
  private keys: any[];

  /**
   * Enum CIVILITE
   *
   * @private
   * @memberof ArtisanComponent
   */
  private civiliteEnum = CIVILITE;

  /**
   * mode pour le formulaire
   *
   * @private
   * @memberof ArtisanComponent
   */
  private addMode = false;

  /**
   * Creates an instance of ArtisanComponent.
   * @param {ArtisansService} _artisansService artisan service
   * @param {FlashMessagesService} flashMsg flash messages
   * @param {FormBuilder} _fb form builder
   * @param {Router} _router router
   * @param {ActivatedRoute} _activatedRoute activated route
   * @memberof ArtisanComponent
   */
  constructor(
    private _artisansService: ArtisansService,
    private flashMsg: FlashMessagesService,
    private _fb: FormBuilder,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {
    this.generateForm();
    this.keys = Object.keys(this.civiliteEnum).filter(Number);
  }

  /**
   * Add Artisan
   *
   * @memberof ArtisanComponent
   */
  addArtisan() {
    this.artisan = this.artisanForm.value;
    this._artisansService.addArtisan(this.artisan).subscribe(
      data => {
        console.log(data);
        this.flashMsg.show(
          GP_flash_messages.ARTISAN.ADD_ARTISAN_SUCCESS,
          GP_flash_config.SUCCESS
        );
        this.artisan = new Artisan();
      },
      err => {
        console.log(err);
        this.flashMsg.show(
          GP_flash_messages.ARTISAN.ADD_ARTISAN_ERROR,
          GP_flash_config.ERROR
        );
      }
    );
  }

  /**
   * Update artisan
   *
   * @memberof ArtisanComponent
   */
  updateArtisan() {
    this.artisan = this.artisanForm.value;
    this.artisan._id = this.id_artisan;
    this._artisansService.updateArtisan(this.artisan).subscribe(
      data => {
        console.log(data);
        this.artisan = new Artisan();
        this.flashMsg.show(
          GP_flash_messages.ARTISAN.UPDATE_ARTISAN_SUCCESS,
          GP_flash_config.SUCCESS
        );
        this._router.navigate([
          'affaires',
          this._activatedRoute.snapshot.root.children[0].params['id_client']
        ]);
      },
      err => {
        this.flashMsg.show(
          GP_flash_messages.ARTISAN.UPDATE_ARTISAN_SUCCESS,
          GP_flash_config.ERROR
        );
        console.log(err);
      }
    );
  }

  /**
   * Reset formulaire et data
   *
   * @memberof ArtisanComponent
   */
  onResetForm() {
    this.artisan = new Artisan();
    this.generateForm();
  }

  /**
   * Get artisan data et set les valeurs du form
   *
   * @param {*} id_artisan
   * @memberof ArtisanComponent
   */
  getArtisan(id_artisan: any) {
    this._artisansService.getOneArtisan(id_artisan).subscribe(
      data => {
        this.artisan = data;
        this.artisanForm.get('civilite').setValue(data.civilite);
        this.artisanForm.get('nom_societe').setValue(data.nom_societe);
        this.artisanForm.get('corps_metier').setValue(data.corps_metier);
        this.artisanForm.get('nom').setValue(data.nom);
        this.artisanForm.get('prenom').setValue(data.prenom);
        this.artisanForm.get('email').setValue(data.email);
        this.artisanForm.get('numTel').setValue(data.numTel);
        this.artisanForm.get('adresse').setValue(data.adresse);
        this.artisanForm.get('complAdresse').setValue(data.complAdresse);
        this.artisanForm.get('cp').setValue(data.cp);
        this.artisanForm.get('ville').setValue(data.ville);
      },
      err => console.log(err)
    );
  }

  /**
   * Generate form
   *
   * @memberof ArtisanComponent
   */
  generateForm() {
    this.artisanForm = this._fb.group({
      civilite: this.artisan.civilite,
      nom_societe: [
        this.artisan.nom_societe,
        Validators.compose([Validators.required])
      ],
      corps_metier: [
        this.artisan.corps_metier,
        Validators.compose([Validators.required])
      ],
      nom: [this.artisan.nom, Validators.compose([this.nomPrenomValidation])],
      prenom: [
        this.artisan.prenom,
        Validators.compose([this.nomPrenomValidation])
      ],
      email: [
        this.artisan.email,
        Validators.compose([Validators.required, this.emailValidation])
      ],
      numTel: [
        this.artisan.numTel,
        Validators.compose([
          Validators.required,
          this.numTelValidation,
          Validators.minLength(10)
        ])
      ],
      adresse: this.artisan.adresse,
      complAdresse: this.artisan.complAdresse,
      cp: this.artisan.cp,
      ville: this.artisan.ville
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

  ngOnInit() {
    console.log(this._activatedRoute);
    if (
      this._activatedRoute.snapshot.params['id_artisan'] !== undefined ||
      this._activatedRoute.snapshot.params['id_artisan']
    ) {
      this.addMode = false;
      this.id_artisan = this._activatedRoute.snapshot.params['id_artisan'];
      this.getArtisan(this.id_artisan);
    } else {
      this.addMode = true;
    }
  }
}
