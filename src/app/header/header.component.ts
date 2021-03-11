import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthServiceService } from '../auth/auth.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuth = false;
  
  private userSub: Subscription;
 

  constructor(private authService: AuthServiceService) { }

  ngOnInit(): void {
   this.userSub =  this.authService.user.subscribe(user => {
      this.isAuth = !user ? false : true;
      
   });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}