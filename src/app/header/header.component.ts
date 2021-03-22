import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
 
  constructor(
    private router: Router,
    private auth: AngularFireAuth,
    private authService: AuthService) { }

  ngOnInit(): void {
 
  }

  getService(){
    return this.authService;
  }

  onLogout(){
    this.authService.SingOut();
  }


}