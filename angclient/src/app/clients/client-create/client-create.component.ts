import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  FormControl,
} from '@angular/forms';
import { ClientService } from '../client.service';

@Component({
  selector: 'app-client-create',
  templateUrl: './client-create.component.html',
  styleUrls: ['./client-create.component.css'],
})
export class ClientCreateComponent implements OnInit {
  clientForm: FormGroup;
  private mode = 'create';
  clientId;

  constructor(public clientService: ClientService, private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit(): void {}

  addClient() {
    if (this.clientForm.invalid) {
      return;
    }

    const formValue = this.clientForm.value;

    if (this.mode === 'create') {

      this.clientService.addClient(formValue.name, formValue.addresses);
    } else {
      // Call update method
      console.log('Entro id ', this.clientId);

      this.clientService.updateClient(
        this.clientId,
        formValue.name,
        formValue.addresses
      );
    }
    this.clientForm.reset();
  }

  createForm() {
    this.clientForm = this.fb.group({
      name: [''],
      addresses: this.fb.array([new FormControl('')]),
    });
  }

  addAddress() {
    this.addresses.push(this.fb.control('', Validators.required));
  }

  deleteAddress(i: number) {
    console.log(this.addresses);

    // If theres only one left, dont delete
    if (this.addresses.length == 1) {
      return;
    }
    this.addresses.removeAt(i);
  }

  get addresses() {
    return this.clientForm.get('addresses') as FormArray;
  }

  edit(id: string) {
    const client = this.clientService.getClient(id);
    this.mode = 'edit';

    this.clientForm.patchValue({
      name: client.name,
      addresses: [client.addresses],
    });

    this.clientId = id;
  }
}
