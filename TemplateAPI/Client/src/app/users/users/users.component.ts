import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Client } from 'src/app/shared/product.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductService } from 'src/app/shared/product.service';
import { DataSource } from '@angular/cdk/table';
import { Observable } from 'rxjs';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';







@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})


export class UsersComponent implements OnInit {
  selected = '';
  selectedValue: string;
  form: FormGroup;
  Addressform: FormGroup;

  regiForm: FormGroup;  
 // album: Product;
  NAME: null;
  Surname : null;
  Email : null;
  Phone : null;
  Gender : string ;
  ClientID: 0;
  description:string;
  id: number;
  IsAccepted:number=0;  
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isEditable = false;

  ClientAddressID : number;
  ClientAddressType : null;
  ClientAddress : null;
  Street : null;
  City : null;
  Province : null;
  PostCode : null;
  


  
  constructor( private fb: FormBuilder, public dialogRef: MatDialogRef<UsersComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Client,public MatDialog: MatDialog,public service : ProductService) { 
     console.log(data);
     // this.local_data = {...data};
    //  this.action = this.data.AlbumId;
    this.description = this.description;

    this.regiForm = fb.group({  
      'NAME': [null, Validators.required],  
      'Surname': [null, Validators.required],  
      'Phone' : [null, Validators.required],  
      'Gender' : [null, Validators.required],
      'Email':[null, Validators.compose([Validators.required,Validators.email])],  
      'IsAccepted':[null]  
    });  
    

    this.form = fb.group({
      ClientID: [this.data.ClientID],
      Name: [this.data.NAME, Validators.required],
      Surname: [this.data.Surname, Validators.required],
      Email : [this.data.Email, Validators.required],
      Phone : [this.data.Phone, Validators.required],
     // Gender : [this.data.Gender, Validators.required],
     // ClientAddressType :  [this.data.ClientAddressType, Validators.required],
      ClientAddress :  [this.data.ClientAddress, Validators.required],
      Street :  [this.data.Street, Validators.required],
      City :  [this.data.City, Validators.required],
      Province :  [this.data.Province, Validators.required],
      PostCode :  [this.data.PostCode, Validators.required]


  });
    }
  

    
  ngOnInit(): void {
    
    this.data.Gender = this.selected;
    this.data.ClientAddressType = this.selected;
    this.checkGender();
    this.checkAddressType();

  }

  checkGender()
  {
    if (this.data.Gender== 'Male')
    {
      this.selected = "Male";
    }
    else 
    {
      this.selected = "Female";
    }


    
  }

  checkAddressType()
  {
    if (this.data.ClientAddressType== '1')
    {
      this.selected = "1";
    }
    if (this.data.ClientAddressType== '2')
    {
      this.selected = "2";
    }
    if (this.data.ClientAddressType== '3')
    {
      this.selected = "3";
    }
   
    
  }

  onChange(event:any)  
  {  
    if (event.checked == true) {  
      this.IsAccepted = 1;  
    } else {  
      this.IsAccepted = 0;  
    }  
  } 

  onFormSubmit(form:NgForm)  
  {  

   
    
   // console.log(form);  
    //this.service.registerUser(this.regiForm.value).subscribe(res => {
      // this.resetForm(this.form.value)
     // alert('reaches here');
     // this.dialogRef.close();
    // this.openSnackBar("User registration successfull","close")
    // this.toastr.success('User registration successful');
     // });
    ///this.service.registerUser(form.value)
      // .subscribe((data: any) => {
      //   if (data.Succeeded == true) {
     //this.resetForm(this.regiForm);
    // this.IsAccepted = 0;
    
      //   }
      //  // else
     // this.toastr.error(data.Errors[0]);
      // });

  }  
 
  closeDialog(){
    this.dialogRef.close({event:'Cancel'});
   // this.service.filter('Register click');
  }

  openDialog(){
    this.MatDialog.open(UsersComponent, {
     height: '400px',
     width: '600px',

   });
 }
 save() {
 // console.log(this.form.value)
  //this.AlbumId = this.data.AlbumId;
  console.log(this.form.value)
  if (this.data.ClientID == 0 || this.data.ClientID == null || this.data.ClientID == undefined)
  {
      
   // this.data.AlbumId == 0;
    this.service.postClient(this.form.value).subscribe(res => {
    // this.resetForm(this.form.value)
   // alert('reaches here');
     this.dialogRef.close();
    });
  }
  else
  {

    this.service.updateClient(this.form.value).subscribe(res => {
     // this.resetForm(this.form.value)
     this.dialogRef.close();
    });

  console.log(this.form.value)

  }
 // save addresses with clients
  this.saveAddress();
 }

saveAddress() {
  // console.log(this.form.value)
   //this.AlbumId = this.data.AlbumId;
   console.log(this.form.value)
   if (this.data.ClientID == 0 || this.data.ClientID == null || this.data.ClientID == undefined)
   {
       
    // this.data.AlbumId == 0;
     this.service.postClientAddress(this.form.value).subscribe(res => {
     // this.resetForm(this.form.value)
    // alert('reaches here');
      this.dialogRef.close();
     });
   }
   else
   {
 
     this.service.updateClientAddress(this.form.value).subscribe(res => {
      // this.resetForm(this.form.value)
      this.dialogRef.close();
     });
 
   console.log(this.form.value)
 
   }
  // this.dialogRef.close(this.form.value);
  // this.closeDialog();
 }





close() {
  this.dialogRef.close();
}



}
