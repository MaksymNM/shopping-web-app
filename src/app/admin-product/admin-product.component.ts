import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirestoreService } from '../shared/firestore.service';
import { Products } from '../products';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import { FormComponent } from '../form/form.component';




@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.css']
})



export class AdminProductComponent implements OnInit {
  products: Products[];
  editState: boolean = false;
  prodToEdit: Products;
  addOn: boolean = false;
  dataSource:Products[];
  

  constructor(private productsService: FirestoreService,
    private dialog: MatDialog) {
      
   
   }
 

  ngOnInit(): void {
    this.productsService.getProducts().subscribe(products =>{
      console.log(products);
      this.products = products;
      this.dataSource = products;
    });
  }

  displayedColumns: string[] = ['name', 'description', 'price', 'imgPath', 'update', 'delete'];
  
  delProd(event, product:Products){
   
    this.productsService.deleteProduct(product);
  }

  editProd(row){
    this.productsService.populateForm(row);
    
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "25%";
    this.dialog.open(FormComponent, dialogConfig);
    
  }

  onAdd(){
    this.addOn = !this.addOn;
  }

  

  onCreate(){
    this.productsService.initForm();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "25%";
    this.dialog.open(FormComponent, dialogConfig);
  }


  
}


