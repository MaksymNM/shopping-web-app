import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  signInForm: FormGroup;

  constructor(
    private authService: AuthService,
    private toastr: ToastrService
  ) { 
      this.signInForm = new FormGroup({
        "email": new FormControl('', [
          Validators.required,
          Validators.email,
        ]),
        "password": new FormControl("", Validators.required)
      });
  }

  getService(){
    return this.authService;
  }

  onSubmit(){
    const email = this.signInForm.value.email;
    const password = this.signInForm.value.password;
    this.authService.SignIn(email, password);
    this.toastr.success("You have successfully signed in");
  }

  ngOnInit(): void {
  }

}
