import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { Card } from '../card';
import { Products } from '../products/products.model';
import { ToCardService } from '../shared/to-card.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit{
  a;  
  i:number;
  constructor(private tocardService: ToCardService) { 
    
  }

  ngOnInit(): void {
    this.a = this.tocardService.getCardProd();
    
  }

  delCardProd(index): void{
    
      if(this.a[this.i] == index){
        this.a.splice(this.i,1);
      }
    

    this.tocardService.deleteCardProduct(index);
  }

}
