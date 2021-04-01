import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {Ng2SearchPipeModule } from 'ng2-search-filter';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ProductsComponent } from './products/products.component';
import { CardComponent } from './card/card.component';
import { AppRoutingModule } from './app-routing.module';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ToastrModule } from 'ngx-toastr';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';


import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FirestoreService } from './shared/firestore.service';
import { AdminProductComponent } from './admin-product/admin-product.component';
import { ToFavlistService } from './shared/to-favlist.service';
import { FavouritesComponent } from './favourites/favourites.component';
import { FormComponent } from './modals/form/form.component';
// import { LoginComponent } from './auth/login/login.component';
// import { SignUp } from './auth/signup/signup.component';
import {  MatFormFieldModule } from '@angular/material/form-field';
import { AuthService } from './shared/auth.service';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { FooterComponent } from './footer/footer.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductsComponent,
    CardComponent,
    FavouritesComponent,
    AdminProductComponent,
    FormComponent,
    SignInComponent,
    SignUpComponent,
    FooterComponent,
    // LoginComponent,
    // SignUp,
    
  
   
  ],
  imports: [
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, 'angularfs'),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    
    ToastrModule.forRoot({positionClass: 'toast-top-center'  ,timeOut:1000}),
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatGridListModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    MatToolbarModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    
  ],
  providers: [FirestoreService, ToFavlistService, AuthService],
  bootstrap: [AppComponent],
  entryComponents:[FormComponent]
})
export class AppModule { }


export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}