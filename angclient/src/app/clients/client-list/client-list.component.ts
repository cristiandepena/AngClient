import { Component, OnInit, Input } from '@angular/core';
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

  ngOnDestroy() {
    this.clientSub.unsubscribe();
  }
}
