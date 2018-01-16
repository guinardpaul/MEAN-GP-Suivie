import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
// Models
import { Bug } from '../models/bug';
// Environment variables
import { environment } from '../../environments/environment';

/**
 *
 * @author Paul GUINARD
 * @export
 * @class BugsService
 */
@Injectable()
export class BugsService {
  private url: string;
  /**
   * Creates an instance of BugsService.
   * @param {HttpClient} http http module
   * @memberof BugsService
   */
  constructor(private http: HttpClient) {
    this.url = environment.url;
  }

  /**
   * Get All Bugs
   *
   * @returns
   * @memberof BugsService
   */
  getAllBugs() {
    return this.http.get<Bug[]>(`${this.url}/bugs`);
  }

  /**
   * Get One Bug
   *
   * @param {number} id bug._id
   * @returns
   * @memberof BugsService
   */
  getOneBug(id: number) {
    return this.http.get<Bug>(`${this.url}/bugs/${id}`);
  }

  /**
   * Add Bug
   *
   * @param {*} bug bug body
   * @returns
   * @memberof BugsService
   */
  addBug(bug: any) {
    return this.http.post(`${this.url}/bugs`, bug);
  }

  /**
   * Update Bug
   *
   * @param {Bug} bug bug body
   * @returns
   * @memberof BugsService
   */
  updateBug(bug: Bug) {
    return this.http.put(`${this.url}/bugs/${bug._id}`, bug);
  }

  /**
   * Delete Bug
   *
   * @param {number} id bug._id
   * @returns
   * @memberof BugsService
   */
  deleteBug(id: number) {
    return this.http.delete(`${this.url}/bugs/${id}`);
  }
}
