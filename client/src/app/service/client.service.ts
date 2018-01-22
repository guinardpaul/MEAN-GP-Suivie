import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
// Models
import { Client } from '../models/client';
// Environment variables
import { environment } from '../../environments/environment';

/**
 *
 * @author Paul GUINARD
 * @export ClientService
 * @class ClientService
 */
@Injectable()
export class ClientService {
  private url;
  public client = new Client();

  /**
   * Creates an instance of ClientService.
   * @param {HttpClient} http http module
   * @memberof ClientService client service
   */
  constructor(private http: HttpClient) {
    this.url = environment.url;
  }

  /**
   * Get all clients.
   *
   * @returns
   * @memberof ClientService
   */
  getAllClients(): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.url}/clients`);
  }

  /**
   * Get one client.
   *
   * @param {number} id client._id
   * @returns
   * @memberof ClientService
   */
  getOneClient(id: number): Observable<Client> {
    return this.http.get<Client>(`${this.url}/clients/${id}`);
  }

  /**
   * Get one client.
   *
   * @param {number} id client._id
   * @returns
   * @memberof ClientService
   */
  getClient(id: number) {
    return this.http.get<Client>(`${this.url}/clients/${id}`).subscribe(
      data => {
        this.client = data;
        console.log(data);
      },
      err => console.log(err)
    );
  }

  /**
   * Vérification sur l'unicité du numéro d'affaire
   *
   * @param {string} numAffaire N° affaire
   * @memberof ClientService
   */
  verifUniciteNumAffaire(numAffaire: string): Observable<any> {
    return this.http.get(`${this.url}/clients/numAffaire/${numAffaire}`);
  }

  /**
   * Save client.
   *
   * @param {Client} client client body
   * @returns
   * @memberof ClientService
   */
  addClient(client: Client): Observable<any> {
    return this.http.post<any>(`${this.url}/clients`, client);
  }

  /**
   * Update client.
   *
   * @param {Client} client client body
   * @returns
   * @memberof ClientService
   */
  updateClient(client: Client): Observable<any> {
    return this.http.put<any>(`${this.url}/clients/${client._id}`, client);
  }

  /**
   * Delete client.
   *
   * @param {number} id client._id
   * @returns
   * @memberof ClientService
   */
  deleteClient(id: number): Observable<any> {
    return this.http.delete<any>(`${this.url}/clients/${id}`);
  }

  /**
   * Update Status Client
   *
   * @param {Client} client client body
   * @param {boolean} status status_client
   * @returns
   * @memberof ClientService
   */
  updateStatus(client: Client, status: boolean) {
    // Set status_client
    client.status_client = status;
    // PUT request
    return this.http.put(`${this.url}/clients/${client._id}`, client);
  }
}
