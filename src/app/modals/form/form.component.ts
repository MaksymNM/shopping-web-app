import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FirestoreService } from '../../shared/firestore.service';
import { Products } from '../../models/products';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  products: Products[];
  

  productAdd: Products = {
    id:'',
    name: '',
    description: '',
    price: 0,
    imgPath: ''
  }
  
  constructor(private service: FirestoreService,
    public dialogRef: MatDialogRef<FormComponent>,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.service.getProducts().subscribe(products =>{
      this.products = products;
    });
    
  }

  getForm(){
    return this.service.addProdForm;
  }

  onClose() {
    this.service.addProdForm.reset();
    this.service.initForm();
    this.dialogRef.close();
  }

  onSubmit(){
    if(!this.service.addProdForm.get('id').value){
      this.service.addProduct(this.service.addProdForm.value);
      this.onClose();
      this.toastr.success("New product was added")
    }
    else {
      this.service.updateProduct(this.service.addProdForm.value);
      this.service.addProdForm.reset();
      this.onClose();
      this.toastr.warning("The product was changed")
    }
  }

  

  

}
