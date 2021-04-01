import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/auth.service';
import { Router } from '@angular/router';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import { SignUpComponent } from '../sign-up/sign-up.component';



@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  signInForm: FormGroup;

  constructor(
    private authService: AuthService, 
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<SignInComponent>,
    private router: Router,
    private dialog: MatDialog
  ) { 
      this.signInForm = new FormGroup({
        "email": new FormControl('', [
          Validators.required,
          Validators.email,
        ]),
        "password": new FormControl("", Validators.required)
      });
  }

  onClose(){
    this.signInForm.reset();
    this.dialogRef.close();
  }

  getService(){
    this.signInForm.reset();
    this.dialogRef.close();
    return this.authService;
  }

  onSubmit(){
    const email = this.signInForm.value.email;
    const password = this.signInForm.value.password;
    this.authService.SignIn(email, password);
    this.onClose();
    this.toastr.success("You have successfully signed in");
   
  }

  ngOnInit(): void {
  }


  onSignUp(){
    this.onClose();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass='custom'
    dialogConfig.autoFocus = true;
    dialogConfig.width = "30%";
    this.dialog.open(SignUpComponent, dialogConfig);
  }

}
