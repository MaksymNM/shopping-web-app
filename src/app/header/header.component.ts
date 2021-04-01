import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { ToCardService } from '../shared/to-card.service';
import { ToFavlistService } from '../shared/to-favlist.service';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import { SignInComponent } from '../auth/sign-in/sign-in.component';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  constructor(
    private router: Router,
    private auth: AngularFireAuth,
    private authService: AuthService,
    private favlist: ToFavlistService,
    private cardList: ToCardService,
    private dialog: MatDialog,
    public translate: TranslateService) { 

      translate.addLangs(['en', 'ru', 'fr']);
      translate.setDefaultLang('en');

      const browserLang = translate.getBrowserLang();
      translate.use(browserLang.match(/en|ru|fr/) ? browserLang: 'en');
    }

  setLang(language: string){
    this.translate.use(language);

  }
    
  ngOnInit(): void {
   
   
  }
  getCountCard(){
    return this.cardList;
  }

  getCount(){
    return this.favlist;
  }

  getService(){
    return this.authService;
  }

  onLogout(){
    this.authService.SingOut();
  }

  onSignIn(){
    encapsulation: ViewEncapsulation.None
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass='custom'
    dialogConfig.autoFocus = true;
    dialogConfig.width = "30%";
    this.dialog.open(SignInComponent, dialogConfig);
  }
}