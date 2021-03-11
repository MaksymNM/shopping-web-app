import { Component, OnInit } from '@angular/core';
import { Card } from '../card';
import { ToCardService } from '../shared/to-card.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  card: Card[];

  constructor(private tocardService: ToCardService) { }

  ngOnInit(): void {
    this.tocardService.getCardProds().subscribe(favprod=>{
      console.log(this.card);
      this.card = favprod;
    })
  }

  delCardProd(event, card:Card){
   
    this.tocardService.deleteCardProduct(card);
  }

}
