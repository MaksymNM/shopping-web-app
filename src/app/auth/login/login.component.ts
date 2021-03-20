import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService,  AuthResponseData} from '../../shared/auth.service';
import { ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoginMode = true;
  error: string= null;

  signUpForm: FormGroup;

  constructor(private authService: AuthServiceService, private router: Router,
    private toastr: ToastrService) { 
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

    
      authObs= this.authService.login(email, password);
    
      
    

    authObs.subscribe(resData =>{
      console.log(resData);
      this.router.navigate(['/products']);

    },
    errorMessage => {
      console.log(errorMessage);
      this.error = errorMessage;
      
    }
    );
   
    this.signUpForm.reset();
    this.toastr.success("Successfull login");
  }

}
