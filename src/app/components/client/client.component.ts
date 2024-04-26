import { Component,OnInit, Inject, inject, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MaterialModule} from '../../modules/material/material.module'
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClientsService } from '../../services/clients.service';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule, NativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';


@Component({
  selector: 'app-client',
  standalone: true,
  imports: [MaterialModule,ReactiveFormsModule,DatePipe,MatDatepickerModule,MatInputModule],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css',
  providers: [{provide: ClientsService},
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    
  ]
})

export class ClientComponent implements OnInit {
  private _clientServices: ClientsService | undefined;
  clientForm!: FormGroup;
  clientData: any;
  clients: any[] = [];
 
  dataSource = new MatTableDataSource();
  filteredClients = new MatTableDataSource();

  searchValue = '';
  

  subscription$: Subscription[] = [];

  clientServices=inject(ClientsService);


  constructor(
    
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ClientComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    
  ) {
    this.clientData = data.client;
  }

 
  ngOnInit(): void {
    this.isEditing = !!this.data.client.sharedKey;
    this.clientForm = this.formBuilder.group({
      sharedKey: [(this.clientData as any).sharedKey, ''],
      businessId: [(this.clientData as any).businessId, Validators.required],
      email: [(this.clientData as any).email, [Validators.required]],
      phone: [(this.clientData as any).phone, Validators.required],
      dataAdded: [(this.clientData as any).dataAdded, Validators.required]
    });
    this.isEditing = !!this.data.client.sharedKey;
  }

  save(client: any) {
    this.subscription$ = [
      ...this.subscription$,
      this.clientServices.create(client).subscribe(res => {
      })
    ];
  }

  
  edit(client: any) {
    this.subscription$ = [
      ...this.subscription$,
      this.clientServices.create(client).subscribe(res => {
      })
    ];
  }
  isEditing: boolean = false;
  onSubmit() {
    

    if (this.data.isEditing){
      const ClientDTO= {   
        sharedKey :this.clientForm.controls['sharedKey'].value,
        businessId: this.clientForm.controls['businessId'].value,
        email: this.clientForm.controls['email'].value,
        phone: this.clientForm.controls['phone'].value,
        dataAdded:this.clientForm.controls['dataAdded'].value
      };
      this.edit(ClientDTO);
    }
    else {
        const Clients= {      
          
          businessId: this.clientForm.controls['businessId'].value,
          email: this.clientForm.controls['email'].value,
          phone: this.clientForm.controls['phone'].value,
          dataAdded:this.clientForm.controls['dataAdded'].value
        };
        this.save(Clients);
      
    }
    
    this.dialogRef.close(this.clientForm.value);
  }

  clearForm() {
    this.clientForm.reset();
  }

  closeDialog() {
    this.dialogRef.close(this.clientForm.value);
  }

  getAllClients() {
    this.subscription$ = [
      ...this.subscription$,
      this.clientServices.getAll().subscribe(res => {

        this.clients = res.objectResponse;
        this.filteredClients.data = this.clients;
      })
    ];
  }

}