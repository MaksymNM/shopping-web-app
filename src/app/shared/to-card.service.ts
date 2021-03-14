import { Injectable, Input, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Card } from '../card';
import { Products } from '../products';

@Injectable({
  providedIn: 'root'
})
export class ToCardService implements OnInit{
  i:number;

  constructor() { 
  }

  ngOnInit(){
    
  }

 
  getCardProd(){
   let a = JSON.parse(localStorage.getItem('cardProd'));
    return a;
  }

  addCardProd(product:Products): void{
    let a: Products[];
    
    a = JSON.parse(localStorage.getItem('cardProd')) || [];

    a.push(product);
    setTimeout(() => {
      localStorage.setItem('cardProd', JSON.stringify(a));
    }, 500);

  }

  deleteCardProduct(index){
    let a = JSON.parse(localStorage.getItem('cardProd')) || [];
    
      if(a[this.i] == index){
        a.splice(this.i,1);
      }
    
    localStorage.setItem('cardProd', JSON.stringify(a));
    
   }


}
