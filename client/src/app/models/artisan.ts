// Enum
import { CIVILITE } from './civilite.enum';
/**
 * Artisan model
 *
 * @export
 * @class Artisan
 */
export class Artisan {
  _id?: number;
  civilite?: CIVILITE;
  nom_societe: string;
  corps_metier: number;
  nom: string;
  prenom: string;
  adresse?: string;
  complAdresse?: string;
  cp?: string;
  ville?: string;
  email: string;
  numTel: string;

  /**
   * Creates an instance of Artisan.
   * @param {Object} [value={}]
   * @memberof Client
   */
  constructor(value: Object = {}) {
    Object.assign(this, value);
  }
}
