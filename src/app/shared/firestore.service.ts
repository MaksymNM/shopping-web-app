import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable} from 'rxjs';
import { map} from 'rxjs/operators';
import { Products } from '../models/products';


@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  productsCollection: AngularFirestoreCollection<Products>;
  products: Observable<Products[]>;
  productDoc: AngularFirestoreDocument<Products>;
  
  constructor(public afs: AngularFirestore) {
    this.productsCollection = this.afs.collection('products');
    this.products = this.productsCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a=>{
        const data = a.payload.doc.data() as Products;
        data.id = a.payload.doc.id;
        return data;
      });
    })); 
   }
   
  addProdForm: FormGroup  = new FormGroup({
    "id":new FormControl(null),
    "name": new FormControl("", Validators.required),
    "description": new FormControl("", Validators.required),
    "price" : new FormControl(0, Validators.required),
    "imgPath": new FormControl("", Validators.required)
  });

  initForm(){
    this.addProdForm.setValue({
      id: null,
      name: '',
      description: '',
      price: 0,
      imgPath: ''
    });
  }

  getProducts(){
    return this.products;
  }

  addProduct(product:Products){
    this.productsCollection.add(product);
  }

  deleteProduct(product:Products){
    this.productDoc = this.afs.doc(`products/${product.id}`);
    this.productDoc.delete();
  }

  updateProduct(product:Products){
    this.productDoc = this.afs.doc(`products/${product.id}`);
    this.productDoc.update(product);
  }

  populateForm(product){
    this.addProdForm.setValue(product);
  }
  
}
