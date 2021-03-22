import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signUpForm:FormGroup;

  constructor(private authService:AuthService,
    private toastr: ToastrService) {
    this.signUpForm = new FormGroup({
      "email": new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      "password": new FormControl("", Validators.required),
      "name": new FormControl("", Validators.required),
      "surname": new FormControl("", Validators.required)
    });
   }

  ngOnInit(): void {
  }

  onSubmit(){
    const email = this.signUpForm.value.email;
    const password = this.signUpForm.value.password;
    const surname = this.signUpForm.value.surname;
    const name = this.signUpForm.value.name;

    this.authService.SignUp(email, password, surname, name);
    this.toastr.success("You have successfully signed up");
  }

  getService(){
    return this.authService;
  }

}
