import { Component, OnInit} from '@angular/core';
import { ToFavlistService } from '../shared/to-favlist.service';
import {ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css'],
  
})
export class FavouritesComponent implements OnInit{
  a;  
  i:number;
 
  constructor(private tofavlistSrvice: ToFavlistService,
    private toastr: ToastrService) { 
  }

  ngOnInit( ): void {
    this.a = this.tofavlistSrvice.getFavProd();
  }
    
    
  delFavProd(index){
    if(this.a[this.i] == index){
      this.a.splice(this.i,1);
    }
    this.tofavlistSrvice.deleteFavProduct(index);
    this.toastr.error("The product was deleted");
  } 
  }

 
  

  
  

 
  




