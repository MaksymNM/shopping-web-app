import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { favProducts } from '../models/favprods';
import { Products } from '../models/products';

@Injectable({
  providedIn: 'root'
})
export class ToFavlistService {
  i:number;

  constructor() {

   }

  getFavProd(){
    let a = JSON.parse(localStorage.getItem('favProd'));
    return a;
  }

  addFavProd(product:Products){
    let a: Products[];
    
    a = JSON.parse(localStorage.getItem('favProd')) || [];

    a.push(product);
    setTimeout(() => {
      localStorage.setItem('favProd', JSON.stringify(a));
    }, 500);
   }

  deleteFavProduct(index){
    let a = JSON.parse(localStorage.getItem('favProd')) || [];
    
    if(a[this.i] == index){
      a.splice(this.i,1);
    }
    
    localStorage.setItem('favProd', JSON.stringify(a));
   }
}
