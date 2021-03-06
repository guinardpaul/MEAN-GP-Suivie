import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
// Models
import { User } from '../../../models/User';
// Services
import { FlashMessagesService } from 'ngx-flash-messages';
import { AuthService } from '../../services/auth.service';
import { ValidationService } from '../../services/validation.service';
// Guards
import { AuthGuard } from '../../../routing/auth.guard';

/**
 * Connexion Compte utilisateur
 * @author Paul GUINARD
 * @export
 * @class LoginComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit {
  private loginForm: FormGroup;
  private user: User;
  private processing: boolean;
  private previousUrl: string;

  private get email(): string { return this.loginForm.get('email').value as string; }
  private get password(): string { return this.loginForm.get('password').value as string; }

  /**
   * Creates an instance of LoginComponent.
   * @param {FormBuilder} _fb Reactive Form Builder
   * @param {AuthService} _authService Auth
   * @param {FlashMsgService} _flashMsg Flash Msg
   * @param {ValidationService} _validationService Validation Form Function
   * @param {AuthGuard} _authGuard route auth guard
   * @param {Router} _router router
   * @memberof LoginComponent
   */
  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _authGuard: AuthGuard,
    private _flashMsg: FlashMessagesService,
    private _validationService: ValidationService,
    private _router: Router
  ) {
    this.createForm();
    this.user = new User();
    this.processing = false;
  }

  /**
   * Generate loginForm
   *
   * @memberof LoginComponent
   */
  createForm() {
    this.loginForm = this._fb.group({
      email: [ '', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(100),
        this._validationService.emailValidation
      ]) ],
      password: [ '', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(150)
      ]) ]
    });
  }

  /**
   * Get Error message du loginForm en fonction des Validators
   *
   * @param {string} arg current Input
   * @returns {string} Error message
   * @memberof LoginComponent
   */
  getErrorMessage(arg: string): string {
    switch (arg) {
      case 'email':
        return this.loginForm.controls[ 'email' ].hasError('required') ? 'Ce champ est requis' :
          this.loginForm.controls[ 'email' ].hasError('emailValidation') ? 'Email invalide' :
            '';

      case 'password':
        return this.loginForm.controls[ 'password' ].hasError('required') ? 'Ce champ est requis' :
          '';

      default:
        break;
    }
  }

  /**
   * Login Compte utilisateur function.
   * - Set User Object
   * - Appel function login du authService
   * - Store user data et token in localStorage
   * - Redirect to home ou previousUrl page
   *
   * @memberof LoginComponent
   */
  onLogin() {
    this.processing = true;
    // Set User Object
    this.user = {
      email: this.email,
      password: this.password
    };
    // Appel function login()
    this._authService.login(this.user)
      .subscribe(data => {
        // Si passport return success
        if (data.info.success) {
          // Store user data et token
          this._authService.storeUserData(data.token);
          this._flashMsg.show('Connexion avec succés', {
            classes: [ 'alert', 'alert-success' ], timeout: 1500
          });

          // Redirect to home ou previousUrl page
          setTimeout(() => {
            this._router.navigate([ '/client' ]);
          }, 1000);
        }
      }, err => {
        this.processing = false;
        if (!err.ok) {
          this._flashMsg.show(err.error.message, {
            classes: [ 'alert', 'alert-danger' ], timeout: 3000
          });
        } else {
          console.log(err);
        }
      });
  }

  ngOnInit() {
  }

}
