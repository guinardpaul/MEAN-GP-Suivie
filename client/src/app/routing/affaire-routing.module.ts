import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AffaireComponent } from 'app/components/affaire/affaire.component';
import { AffaireDashboardComponent } from 'app/components/affaire/affaire-dashboard/affaire-dashboard.component';
import { DevisComponent } from 'app/components/devis/devis.component';
import { GestionMoeComponent } from 'app/components/affaire/gestion-moe/gestion-moe.component';
import { ArtisanComponent } from 'app/components/affaire/gestion-moe/artisan/artisan.component';

const affaireRoutes: Routes = [
  {
    path: 'affaires/:id_client',
    component: AffaireComponent,
    children: [
      { path: '', component: AffaireDashboardComponent },
      { path: 'gestion-moe', component: GestionMoeComponent },
      { path: 'gestion-moe/artisans', component: ArtisanComponent },
      { path: 'devis', component: DevisComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(affaireRoutes)],
  exports: [RouterModule]
})
export class AffaireRoutingModule {}
