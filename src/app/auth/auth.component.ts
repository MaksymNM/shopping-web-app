import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService,  AuthResponseData} from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  error: string= null;

  signUpForm: FormGroup;

  constructor(private authService: AuthServiceService, private router: Router) { 
    this.signUpForm = new FormGroup({
      "email": new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      "password": new FormControl("", Validators.required)
    });

  }

  ngOnInit(): void {
  }

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(){
    if(this.signUpForm.invalid){
      return;
    }
    const email = this.signUpForm.value.email;
    const password = this.signUpForm.value.password;

    let authObs: Observable<AuthResponseData>

    if(this.isLoginMode){
      authObs= this.authService.login(email, password);
    } else {
      authObs=this.authService.signup(email, password);
    }

    authObs.subscribe(resData =>{
      console.log(resData);
      this.router.navigate(['/admin-products']);

    },
    errorMessage => {
      console.log(errorMessage);
      this.error = errorMessage;
      
    }
    );
   
    this.signUpForm.reset();
  }

}
