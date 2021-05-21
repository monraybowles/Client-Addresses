import { Component, OnInit, Optional, Inject } from '@angular/core';

import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductService } from 'src/app/shared/product.service';
import { UserService } from 'src/app/shared/user.service';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  user: User;
  regiForm: FormGroup;  
  UserName:string='';
  Password:string='';
  FirstName:string='';  
  LastName:string='';  
  
  
  Email:string='';  
  IsAccepted:number=0;  
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isEditable = false;
  
  constructor(private fb: FormBuilder,public service : UserService,private _snackBar: MatSnackBar,private x: MatSnackBarModule) {   
  
  
    // To initialize FormGroup  
    this.regiForm = fb.group({  
      'UserName': [null, Validators.required],  
      'Password': [null, Validators.required],  
      'FirstName' : [null, Validators.required],  
      'LastName' : [null, Validators.required],    

      'Email':[null, Validators.compose([Validators.required,Validators.email])],  
      'IsAccepted':[null]  
    });  
  
  }  
  ngOnInit(): void {
    this.firstFormGroup = this.fb.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this.fb.group({
      secondCtrl: ['', Validators.required]
    });
  }
  
  // On Change event of Toggle Button  
  onChange(event:any)  
  {  
    if (event.checked == true) {  
      this.IsAccepted = 1;  
    } else {  
      this.IsAccepted = 0;  
    }  
  }  

  resetForm(form: FormGroup) {

    form.reset();

    Object.keys(form.controls).forEach(key => {
      form.get(key).setErrors(null) ;
    });
}
  // Executed When Form Is Submitted  
  onFormSubmit(form:NgForm)  
  {  

   
    
    console.log(form);  
    this.service.registerUser(this.regiForm.value).subscribe(res => {
      // this.resetForm(this.form.value)
     // alert('reaches here');
     // this.dialogRef.close();
     this.openSnackBar("User registration successfull","close")
    // this.toastr.success('User registration successful');
      });
    ///this.service.registerUser(form.value)
      // .subscribe((data: any) => {
      //   if (data.Succeeded == true) {
     this.resetForm(this.regiForm);
     this.IsAccepted = 0;
    
      //   }
      //  // else
     // this.toastr.error(data.Errors[0]);
      // });

  }  

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
     // panelClass: ['mat-toolbar', 'mat-accent']
     panelClass: ['green-snackbar']
    });
  }
    
}  
