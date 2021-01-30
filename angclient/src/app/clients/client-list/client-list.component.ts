import { Component, OnInit, Input } from '@angular/core';
import { Client } from '../client.model';
import { ClientService } from '../client.service';
import { Subscription } from 'rxjs';
import { ClientCreateComponent } from '../client-create/client-create.component';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css'],
})
export class ClientListComponent implements OnInit {
  clients: Client[] = [];
  private clientSub: Subscription;
  @Input() createComp: ClientCreateComponent
  clientId;

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

  onEdit(input: HTMLInputElement){
    const clientId = input.value;
    this.createComp.edit(clientId);

  }

  ngOnDestroy() {
    this.clientSub.unsubscribe();
  }
}
