/**
 * FactureGlobal model
 *
 * @export
 * @class FactureGlobal
 */
export class FactureGlobal {
  _id?: number;
  status_factureGlobal?: boolean;
  ref_factureGlobal: string;
  date_creation: Date;
  montantHt: number;
  tauxTva: number;
  montantTtcTotal: number;
  montantTtcFacture: number;
  montantTtcRegle: number;
  client: number;
  artisan: number;
  devis: number;
  valid?: boolean;
  description?: string;
  updated_at?: Date;

  /**
   * Creates an instance of FactureGlobal.
   * @param {Object} [value={}]
   * @memberof FactureGlobal
   */
  constructor(value: Object = {}) {
    Object.assign(this, value);
  }
}
