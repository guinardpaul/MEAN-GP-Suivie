import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// Services
import { FlashMessagesService } from 'ngx-flash-messages';
import { EmailService } from '../../services/email.service';
import { AuthService } from '../../services/auth.service';
// Models
import { Email } from '../../../models/Email';
import { User } from '../../../models/User';
// Templates
import * as mailTemplate from '../../../models/template-email';

/**
 * Forgot Password du Compte utilisateur
 * @author Paul GUINARD
 * @export ForgotPasswordComponent
 * @class ForgotPasswordComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: [ './forgot-password.component.css' ]
})
export class ForgotPasswordComponent implements OnInit {
  private forgotPasswordForm: FormGroup;
  private requestSubmitted: boolean;
  private emailUrl: string;
  private adresseEmail: string;
  private processing: boolean;
  private user: User;

  private get email(): string { return this.forgotPasswordForm.get('email').value as string; }

  /**
   * Creates an instance of ForgotPasswordComponent.
   * @param {EmailService} _emailService Email
   * @param {AuthService} _authService Authentication
   * @param {FlashMsgService} _flashMsg Flash Msg
   * @param {FormBuilder} _fb Reactive Form Builder
   * @memberof ForgotPasswordComponent
   */
  constructor(
    private _emailService: EmailService,
    private _flashMsg: FlashMessagesService,
    private _authService: AuthService,
    private _fb: FormBuilder
  ) {
    this.requestSubmitted = false;
    this.processing = false;
    this.createForm();
    this.user = new User();
    this.emailUrl = 'http://www.gmail.com';
  }

  /**
   * Generate forgotPasswordForm
   *
   * @memberof ForgotPasswordComponent
   */
  createForm() {
    this.forgotPasswordForm = this._fb.group({
      email: [ '', Validators.compose([
        Validators.required
      ]) ]
    });
  }

  /**
   * Get User by Email. Appelé par forgotPassword()
   *
   * @param {string} email email
   * @memberof ForgotPasswordComponent
   */
  getUserByEmail(email: string) {
    this._authService.getUserByEmail(email)
      .subscribe(user => {
        this.user = user.obj;
      }, err => console.log(err)
      );
  }

  /**
   * Send forgotPassword mail pour réinitialiser le password.
   * - Appel fonction getUserByEmail()
   * - Envoi Email de réinitialisation du password
   *
   * @memberof ForgotPasswordComponent
   */
  forgotPassword() {
    this.processing = true;
    this.adresseEmail = this.email;
    this.getUserByEmail(this.email);

    setTimeout(() => {
      const mailBody = mailTemplate.forgotPassword(this.user);
      const mail: Email = {
        to: this.adresseEmail,
        subject: 'Mot de passe oublié ?',
        text: mailBody
      };

      this._emailService.sendMail(mail)
        .subscribe(
        data => {
          this.requestSubmitted = true;
          this.processing = false;
        },
        err => {
          console.log(err);
          this._flashMsg.show('Erreur durant l\'envoi du message, réessayer plus tard', {
            classes: [ 'alert', 'alert-danger' ],
            timeout: 3000
          });
          this.processing = false;
        });
    }, 1000);

  }

  ngOnInit() {
  }

}
