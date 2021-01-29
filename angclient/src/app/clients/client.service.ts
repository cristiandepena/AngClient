import { Injectable } from '@angular/core';
import { Client } from './client.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ClientService {
  private clients: Client[] = [];
  private clientUpdated = new Subject<Client[]>();

  constructor(private http: HttpClient) {}

  getClients() {
    this.http
      .get<{ message: string; clients: Client[] }>(
        'http://localhost:8080/api/clients'
      )
      .subscribe((clientData) => {
        this.clients = clientData.clients;
        this.clientUpdated.next([...this.clients]);
      });
  }

  getClientUpdateListener() {
    return this.clientUpdated.asObservable();
  }

  addClient(name, address) {
    const client: Client = { id: null, name: name, address: address };

    this.http
      .post<{ message: string; client: Client[] }>(
        'http://localhost:8080/api/clients',
        client
      )
      .subscribe((responseData) => {
        console.log(responseData.message);
        this.clients.push(client);
        this.clientUpdated.next([...this.clients]);
      });
  }
}
