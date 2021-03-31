import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/auth.service';
import { SignInComponent } from '../sign-in/sign-in.component';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signUpForm:FormGroup;

  constructor(private authService:AuthService,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<SignUpComponent>,
    private dialog: MatDialog
    ) {
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

  onClose() {
    this.signUpForm.reset();
    this.dialogRef.close();
  }

  onSubmit(){
    const email = this.signUpForm.value.email;
    const password = this.signUpForm.value.password;
    const surname = this.signUpForm.value.surname;
    const name = this.signUpForm.value.name;

    this.authService.SignUp(email, password, surname, name);
    this.onClose();
    this.toastr.success("You have successfully signed up");
  }

  getService(){
    this.onClose();
    return this.authService;
  }

  onSignIn(){
    this.onClose();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass='custom'
    dialogConfig.autoFocus = true;
    dialogConfig.width = "30%";
    this.dialog.open(SignInComponent, dialogConfig);
  }
}
