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
  a;  
  i:number;
 
  constructor(private tofavlistSrvice: ToFavlistService) { 
  }

  ngOnInit( ): void {
    this.a = this.tofavlistSrvice.getFavProd();
      }
    
    
  delFavProd(index){
    if(this.a[this.i] == index){
      this.a.splice(this.i,1);
    }
  

  this.tofavlistSrvice.deleteFavProduct(index);
      }
    
    

    
  }

 
  

  
  

 
  




