import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Card } from '../card';
import { Products } from '../products';

@Injectable({
  providedIn: 'root'
})
export class ToCardService {
  cardCollection: AngularFirestoreCollection<Card>;
  card: Observable<Card[]>;
  cardDoc: AngularFirestoreDocument<Card>;

  productDoc: AngularFirestoreDocument<Products>;

  constructor(public afs: AngularFirestore) { 
    this.cardCollection = this.afs.collection('card');

    this.card = this.cardCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a =>{
          const data = a.payload.doc.data() as Card;
          data.id = a.payload.doc.id;
          return data;
      });
     }));
  }

  getCardProds(){
    return this.card;
  }

  addCardProd(product: Products){
    this.productDoc = this.afs.doc(`records/${product.id}`);
    this.cardCollection.add(product);
    
   }

  deleteCardProduct(card: Card){
    this.cardDoc = this.afs.doc(`card/${card.id}`);
    this.cardDoc.delete();
   }


}
