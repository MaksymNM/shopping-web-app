import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthServiceService } from '../shared/auth.service'
import { UserModel } from '../auth/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuth = false;
  user = '';
  private userSub: Subscription;
 

  constructor(private authService: AuthServiceService) { }

  ngOnInit(): void {
   this.userSub =  this.authService.user.subscribe(user => {
      this.isAuth = !user ? false : true;
      this.user = user.email;
   });
   
  }

  // ngOnDestroy(): void {
  //   this.userSub.unsubscribe();
  // }

  onExit(){
    this.isAuth = false;
  }
}