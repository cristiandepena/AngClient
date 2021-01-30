import { Component, OnInit } from '@angular/core';
import { Client } from '../client.model';
import { ClientService } from '../client.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css'],
})
export class ClientListComponent implements OnInit {
  clients: Client[] = [];
  private clientSub: Subscription;

  constructor(public clientService: ClientService) {}

  ngOnInit(): void {
    this.clientService.getClients();
    this.clientSub = this.clientService
      .getClientUpdateListener()
      .subscribe((clients: Client[]) => {
        this.clients = clients;
      });
  }

  onDelete(clientId: string) {
    console.log('on Delete ', clientId);

    this.clientService.deleteClient(clientId);
  }

  ngOnDestroy() {
    this.clientSub.unsubscribe();
  }
}
