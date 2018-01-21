import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material';
// Angular Flash messages
import { FlashMessagesModule } from 'ngx-flash-messages';
// ng2-Charts
import { ChartsModule } from 'ng2-charts';
// Modules
import { AuthenticationModule } from './authentication/authentication.module';
import { AppRoutingModule } from './routing/app-routing.module';
// import Components
import { AppComponent } from './app.component';
import { ClientComponent } from './components/client/client.component';
import { DevisComponent } from './components/devis/devis.component';
import { FactureGlobalComponent } from './components/facture-global/facture-global.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ValiderDevisComponent } from './components/valider-devis/valider-devis.component';
import { FactureAccompteComponent } from './components/facture-accompte/facture-accompte.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { BugsComponent } from './components/bugs/bugs.component';
import { AffaireComponent } from './components/affaire/affaire.component';
// import Services
import { ClientService } from './service/client.service';
import { DevisService } from './service/devis.service';
import { FactureGlobalService } from './service/facture-global.service';
import { FactureAccompteService } from './service/facture-accompte.service';
import { DetailsDevisService } from './service/details-devis.service';
import { ReglementService } from './service/reglement.service';
import { BugsService } from './service/bugs.service';
import { AuthService } from './authentication/services/auth.service';
import { ValidationService } from './authentication/services/validation.service';
import { EmailService } from './authentication/services/email.service';
import { ArtisansService } from './service/artisans.service';
import { CorpsMetierService } from './service/corps-metier.service';
// Guards
import { AuthGuard } from './routing/auth.guard';
import { NotAuthGuard } from './routing/not-auth.guard';
// Pipes
import { SortNumberPipe } from './pipes/sort-number.pipe';
import { SortStringPipe } from './pipes/sort-string.pipe';
import { OrderByDatePipe } from './pipes/order-by-date.pipe';
import { AffaireRoutingModule } from 'app/routing/affaire-routing.module';
import { AffaireNavbarComponent } from 'app/components/affaire/affaire-navbar/affaire-navbar.component';
import { AffaireDashboardComponent } from 'app/components/affaire/affaire-dashboard/affaire-dashboard.component';
import { GestionMoeComponent } from './components/affaire/gestion-moe/gestion-moe.component';
import { ArtisanComponent } from './components/affaire/gestion-moe/artisan/artisan.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientComponent,
    DevisComponent,
    FactureGlobalComponent,
    DashboardComponent,
    NavbarComponent,
    ValiderDevisComponent,
    PageNotFoundComponent,
    FactureAccompteComponent,
    BugsComponent,
    SortNumberPipe,
    SortStringPipe,
    OrderByDatePipe,
    AffaireComponent,
    AffaireNavbarComponent,
    AffaireDashboardComponent,
    GestionMoeComponent,
    ArtisanComponent
  ],
  imports: [
    BrowserAnimationsModule,
    AuthenticationModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    FlashMessagesModule,
    ChartsModule,
    AffaireRoutingModule,
    AppRoutingModule
  ],
  providers: [
    ClientService,
    DevisService,
    FactureAccompteService,
    FactureGlobalService,
    DetailsDevisService,
    ReglementService,
    DatePipe,
    BugsService,
    AuthGuard,
    NotAuthGuard,
    AuthService,
    ValidationService,
    EmailService,
    ArtisansService,
    CorpsMetierService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
