import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminProductComponent } from "./admin-product/admin-product.component";
import { AuthComponent } from "./auth/auth.component";
import { SignUp } from "./auth/signup.component";
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
    component: AdminProductComponent
},
{
    path: 'card',
    component: CardComponent
},
{
    path: 'auth',
    component: AuthComponent
},
{
    path: 'sign-up',
    component: SignUp
}



];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule{

}