/**
 * CorpsMetier model
 *
 * @export
 * @class CorpsMetier
 */
export class CorpsMetier {
  _id?: number;
  corps_metier: string;

  /**
   * Creates an instance of CorpsMetier.
   * @param {Object} [value={}]
   * @memberof CorpsMetier
   */
  constructor(value: Object = {}) {
    Object.assign(this, value);
  }
}
