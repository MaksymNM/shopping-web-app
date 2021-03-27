import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminProductComponent } from "./admin-product/admin-product.component";
// import { LoginComponent } from "./auth/login/login.component";
import { SignInComponent } from "./auth/sign-in/sign-in.component";
import { SignUpComponent } from "./auth/sign-up/sign-up.component";
// import { SignUp } from "./auth/signup/signup.component";
import { CardComponent } from "./card/card.component";
import { FavouritesComponent } from "./favourites/favourites.component";
import { ProductsComponent } from "./products/products.component";


const appRoutes: Routes = [
{
    path: '', 
    redirectTo: '/products',
    pathMatch: 'full'
},

{
    path: 'products',
    component: ProductsComponent
},
{
    path: 'favourites',
    component: FavouritesComponent
},
{
    path: 'admin-products',
    component: AdminProductComponent,
},
{
    path: 'card',
    component: CardComponent
},
{
    path: 'login',
    component: SignInComponent,
},
{
    path: 'signup',
    component: SignUpComponent
}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule{

}