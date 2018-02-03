import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AffaireComponent } from 'app/components/affaire/affaire.component';
import { AffaireDashboardComponent } from 'app/components/affaire/affaire-dashboard/affaire-dashboard.component';
import { DevisComponent } from 'app/components/devis/devis.component';
import { GestionMoeComponent } from 'app/components/affaire/gestion-moe/gestion-moe.component';
import { ArtisanComponent } from 'app/components/affaire/gestion-moe/artisan/artisan.component';
import { ValiderDevisComponent } from 'app/components/valider-devis/valider-devis.component';
import { FactureAccompteComponent } from 'app/components/facture-accompte/facture-accompte.component';

const affaireRoutes: Routes = [
  {
    path: 'affaires/:id_client',
    component: AffaireComponent,
    children: [
      { path: '', component: AffaireDashboardComponent },
      { path: 'gestion-moe', component: GestionMoeComponent },
      {
        path: 'gestion-moe/artisans',
        component: ArtisanComponent,
        pathMatch: 'full'
      },
      {
        path: 'gestion-moe/artisans/:id_artisan',
        component: ArtisanComponent
      },
      { path: 'suivi/:id_artisan/devis', component: DevisComponent },
      {
        path: 'suivi/:id_artisan/devis/:id_devis',
        component: ValiderDevisComponent
      },
      {
        path: 'suivi/:id_artisan/factures/:id_facture',
        component: FactureAccompteComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(affaireRoutes)],
  exports: [RouterModule]
})
export class AffaireRoutingModule {}
