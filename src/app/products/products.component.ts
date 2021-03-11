import { Component, OnInit } from '@angular/core';
import { favProducts } from '../favprods';
import { FirestoreService } from '../shared/firestore.service';
import { Products } from '../products';
import { ToCardService } from '../shared/to-card.service';
import { ToFavlistService } from '../shared/to-favlist.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],

})
export class ProductsComponent implements OnInit {
  products: Products[];
  favprods: favProducts[];
  product:Products;

  filtered: Object[];
  resHide: boolean = false;

  selected ='';
  lastSortedByField;
  ascendingOrder = true;

  constructor(private productsService: FirestoreService,
    private tofavlistSrvice: ToFavlistService,
    private tocardSrvice: ToCardService) { }

  ngOnInit(): void {
    this.productsService.getProducts().subscribe(products => {
      console.log(products);
      this.products = products;

    
    });



    this.tofavlistSrvice.getFavProd().subscribe(favprod=>{
      console.log(favprod);
      this.favprods = favprod;
    })
    
  }

  onSubmit(value) {
    this.filtered = this.products.filter(product => product.name === value.reg);
    this.resHide = !this.resHide;
  }

  sortByField(field) {
    if(this.lastSortedByField === field) {
      this.ascendingOrder = !this.ascendingOrder;
    }
    else {
      this.lastSortedByField = field;
      this.ascendingOrder = true;
    }

    if(this.ascendingOrder) {
      this.products = this.products.sort((a, b) => {
        if (a[field] < b[field])
          return -1;
        if (a[field] > b[field])
          return 1;
        return 0;
      });
    } else {
      this.products = this.products.sort((a, b) => {
        if (a[field] < b[field])
          return 1;
        if (a[field] > b[field])
          return -1;
        return 0;
      });
    }

  }

  
  addFavProds(event, product: Products){
    this.tofavlistSrvice.addFavProd(product);
  }  

  addCardProds(event, product: Products){
    this.tocardSrvice.addCardProd(product);
  }  

  
    
  
}
