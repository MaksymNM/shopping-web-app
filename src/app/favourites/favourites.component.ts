import { Component, OnInit} from '@angular/core';
import { Products } from '../products/products.model';
import { Observable, of, Subscription } from 'rxjs';
import { ToFavlistService } from '../shared/to-favlist.service';
import { favProducts } from '../favprods';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css'],
  
})
export class FavouritesComponent implements OnInit{
    products: Products[];
    favprods: favProducts[];
 
  constructor(private tofavlistSrvice: ToFavlistService) { 
  }

  

  ngOnInit( ): void {
    this.tofavlistSrvice.getFavProd().subscribe(favprod=>{
        console.log(favprod);
        this.favprods = favprod;
      })
      }
    
    
      delFavProd(event, favprod:favProducts){
   
        this.tofavlistSrvice.deleteFavProduct(favprod);
      }
    
    

    
  }

 
  

  
  

 
  




