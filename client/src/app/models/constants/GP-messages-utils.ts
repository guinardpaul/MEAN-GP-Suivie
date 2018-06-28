export const GP_flash_messages = {
  CLIENT: {
    ADD_CLIENT_SUCCESS: 'Client sauvé avec succès',
    ADD_CLIENT_ERROR: 'Erreur création du Client',
    UPDATE_CLIENT_SUCCESS: 'Client modifié avec succès',
    UPDATE_CLIENT_ERROR: 'Erreur modification du Client',
    REMOVE_CLIENT_SUCCESS: 'Client supprimé avec succès',
    REMOVE_CLIENT_ERROR: 'Erreur suppression du Client',
    REMOVE_CLIENT_IMPOSSIBLE:
      'Suppression impossible ! le client est associé à des devis'
  },
  DEVIS: {
    ADD_DEVIS_SUCCESS: 'Devis sauvé avec succès',
    ADD_DEVIS_ERROR: 'Erreur création du Devis',
    UPDATE_DEVIS_SUCCESS: 'Devis modifié avec succès',
    UPDATE_DEVIS_ERROR: 'Erreur modification du Devis',
    REMOVE_DEVIS_SUCCESS: 'Devis supprimé avec succès',
    REMOVE_DEVIS_ERROR: 'Erreur suppression du Devis',
    REMOVE_DEVIS_IMPOSSIBLE:
      'Suppression impossible ! Le devis est associé à des factures.'
  },
  FACTURE: {
    ADD_FACTURE_SUCCESS: 'Facture sauvée avec succès',
    ADD_FACTURE_ERROR: 'Erreur création de la Facture',
    UPDATE_FACTURE_SUCCESS: 'Facture modifiée avec succès',
    UPDATE_FACTURE_ERROR: 'Erreur modification de la Facture',
    REMOVE_FACTURE_SUCCESS: 'Facture supprimée avec succès',
    REMOVE_FACTURE_ERROR: 'Erreur suppression de la Facture',
    REMOVE_FACTURE_IMPOSSIBLE:
      'Suppression impossible ! La facture est associée à des règlements.',
    ADD_FACTURE_ACCOMPTE_IMPOSSIBLE:
      'Création impossible : le montant total de la facture est égal à la somme des montants facturés'
  },
  REGLEMENT: {
    ADD_REGLEMENT_SUCCESS: 'Règlement sauvé avec succès',
    ADD_REGLEMENT_ERROR: 'Erreur création du Règlement',
    UPDATE_REGLEMENT_SUCCESS: 'Règlement modifié avec succès',
    UPDATE_REGLEMENT_ERROR: 'Erreur modification du Règlement',
    REMOVE_REGLEMENT_SUCCESS: 'Règlement supprimé avec succès',
    REMOVE_REGLEMENT_ERROR: 'Erreur suppression du Règlement'
  },
  ARTISAN: {
    ADD_ARTISAN_SUCCESS: 'Artisan sauvé avec succès',
    ADD_ARTISAN_ERROR: 'Erreur création du Artisan',
    UPDATE_ARTISAN_SUCCESS: 'Artisan modifié avec succès',
    UPDATE_ARTISAN_ERROR: 'Erreur modification du Artisan',
    REMOVE_ARTISAN_SUCCESS: 'Artisan supprimé avec succès',
    REMOVE_ARTISAN_ERROR: 'Erreur suppression du Artisan'
  },
  BUG: {
    ADD_BUG_SUCCESS: 'Bug sauvé avec succès',
    ADD_BUG_ERROR: 'Erreur création du Bug',
    UPDATE_BUG_SUCCESS: 'Bug modifié avec succès',
    UPDATE_BUG_ERROR: 'Erreur modification du Bug',
    REMOVE_BUG_SUCCESS: 'Bug supprimé avec succès',
    REMOVE_BUG_ERROR: 'Erreur suppression du Bug'
  }
};

export const GP_flash_config = {
  SUCCESS: { classes: ['alert', 'alert-success'], timeout: 3000 },
  WARNING: { classes: ['alert', 'alert-warning'], timeout: 3000 },
  ERROR: { classes: ['alert', ' alert-danger'], timeout: 3000 }
};
