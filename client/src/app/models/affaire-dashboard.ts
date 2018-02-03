/**
 * AffaireDashboardData
 *
 * @export
 * @class AffaireDashboardData
 */
export class AffaireDashboardData {
  artisan_id: number;
  status: boolean;
  artisan_corps_metier: string;
  montantTotalTTC: number;
  montantFactureTTC: number;
  montantRegle: number;

  /**
   * Creates an instance of Artisan.
   * @param {Object} [value={}]
   * @memberof Client
   */
  constructor(value: Object = {}) {
    Object.assign(this, value);
  }
}
