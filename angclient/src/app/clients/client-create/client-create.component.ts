import { Component, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ClientService } from '../client.service';

@Component({
  selector: 'app-client-create',
  templateUrl: './client-create.component.html',
  styleUrls: ['./client-create.component.css'],
})
export class ClientCreateComponent implements OnInit {

  enteredName;
  enteredLastName;
  enteredAddress;
  enteredPhone;

  constructor(public clientService: ClientService) {}

  ngOnInit(): void {}

  addClient(form: NgForm) {
    if(form.invalid){
      return;
    }

    this.clientService.addClient(form.value.name, form.value.address);
    form.resetForm();
  }
}
