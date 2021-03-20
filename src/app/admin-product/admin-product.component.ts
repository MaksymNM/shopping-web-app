import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirestoreService } from '../shared/firestore.service';
import { Products } from '../models/products';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import { FormComponent } from '../modals/form/form.component';
import {ToastrService} from 'ngx-toastr';




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
    private dialog: MatDialog,
    private toastr: ToastrService) {
      
   
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
    this.toastr.error("The product was deleted");
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


