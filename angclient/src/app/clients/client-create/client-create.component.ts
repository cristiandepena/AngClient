import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  NgForm,
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

  constructor(public clientService: ClientService, private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit(): void {}

  addClient() {
    if (this.clientForm.invalid) {
      return;
    }
    const formValue = this.clientForm.value;
    this.clientService.addClient(formValue.name, formValue.addresses);
    this.clientForm.reset();
  }

  createForm() {
    this.clientForm = this.fb.group({
      name: [''],
      addresses: this.fb.array([
        new FormControl('', Validators.required)
      ]),
    });
  }

  addAddress() {
    this.addresses.push(this.fb.control('', Validators.required));
  }

  deleteAddress(i:number){
    console.log(this.addresses);

    if(this.addresses.length == 1){
      return;
    }
    this.addresses.removeAt(i);
  }

  get addresses() {
    return this.clientForm.get('addresses') as FormArray;
  }
}
