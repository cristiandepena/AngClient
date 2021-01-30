import { Injectable } from '@angular/core';
import { Client } from './client.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ClientService {
  private clients: Client[] = [];
  private clientUpdated = new Subject<Client[]>();

  constructor(private http: HttpClient) {}

  getClients() {
    this.http
      .get<{ message: string; clients: any[] }>(
        'http://localhost:8080/api/clients'
      )
      .pipe(map((clientData)=> {
        return clientData.clients.map(client => {
          return {
            id: client._id,
            name: client.name,
            addresses: client.addresses
          };
        });
      }))
      .subscribe((transformedClient) => {
        this.clients = transformedClient;
        this.clientUpdated.next([...this.clients]);
      });
  }

  getClient(id: string) {
    return {...this.clients.find(c => c.id === id)}
  };

  getClientUpdateListener() {
    return this.clientUpdated.asObservable();
  }

  addClient(name, addresses) {
    const client: Client = { id: null, name: name, addresses: addresses };
    console.log('El cliente env ', client);

    this.http
      .post<{ message: string; clientId: string }>(
        'http://localhost:8080/api/clients',
        client
      )
      .subscribe((responseData) => {

        const clientId = responseData.clientId;
        client.id = clientId;

        this.clients.push(client);
        this.clientUpdated.next([...this.clients]);
      });
  }

  updateClient(id: string, name: string, addresses: []){
    const client: Client = {id: id, name: name, addresses: addresses};
    this.http.put('http://localhost:8080/api/clients/' + id, client).subscribe( response => {
      const updatedClients = [...this.clients];
      const oldClientIndex = updatedClients.findIndex(c => c.id === client.id);
      updatedClients[oldClientIndex] = client;
      this.clients = updatedClients;
      this.clientUpdated.next([...this.clients]);
    });
  }

  deleteClient(clientId: string) {
    this.http
      .delete('http://localhost:8080/api/clients/' + clientId)
      .subscribe(() => {
        const updatedClients = this.clients.filter(client => client.id !== clientId);
        this.clients = updatedClients;
        this.clientUpdated.next([...this.clients]);
      });
  }
}
