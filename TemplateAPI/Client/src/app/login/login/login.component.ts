import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from 'src/app/shared/user.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;  
  username:string;
  password:string;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(private fb: FormBuilder, private router: Router,public service : UserService) {
 
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }




  ngOnInit() {

    
  }
  onSubmit() {

  //alert(this.loginForm.controls['username'].value);
  // //console.log(this.loginForm);
    this.service.userAuthentication(this.loginForm.controls['username'].value,this.loginForm.controls['password'].value).subscribe((data : any)=>{
       localStorage.setItem('userToken',data.access_token);
        console.log(data);
        localStorage.setItem('isLoggedin', 'true');
        this.router.navigate(['/dashboard']);
       },
       (err : HttpErrorResponse)=>{
      // this.isLoginError = true;
      });
 
  // this.router.navigate(['/dashboard']);

  // this.submitted = true;

  // // stop here if form is invalid
  // if (this.loginForm.invalid) {
  //     return;
  // }

//   this.loading = true;
//   this.service.login(this.loginForm.controls['username'].value, this.loginForm.controls['password'].value)
//       .pipe(first())
//       .subscribe(
//           data => {
//             this.router.navigate(['/dashboard']);
//           },
//           error => {
//               this.error = error;
//               this.loading = false;
//           });
 }




   
}
