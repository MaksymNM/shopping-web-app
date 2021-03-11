import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { favProducts } from '../favprods';
import { Products } from '../products';

@Injectable({
  providedIn: 'root'
})
export class ToFavlistService {
  favprodCollection: AngularFirestoreCollection<favProducts>;
  favproducts: Observable<favProducts[]>;
  favprodDoc: AngularFirestoreDocument<favProducts>;

  productDoc: AngularFirestoreDocument<Products>;

  constructor(public afs: AngularFirestore) {
    this.favprodCollection = this.afs.collection('favprods');

    this.favproducts = this.favprodCollection.snapshotChanges().pipe(map(changes => {
    return changes.map(a =>{
        const data = a.payload.doc.data() as favProducts;
        data.id = a.payload.doc.id;
        return data;
    });
   }));
   }

   getFavProd(){
    return this.favproducts;
  }

  addFavProd(product: Products){
    this.productDoc = this.afs.doc(`records/${product.id}`);
    this.favprodCollection.add(product);
    
   }

   deleteFavProduct(favprod: favProducts){
    this.favprodDoc = this.afs.doc(`favprods/${favprod.id}`);
    this.favprodDoc.delete();
   }
}
