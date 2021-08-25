import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import Product from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ManageProductService {

  db_path='products';
  productRef:AngularFireList<Product>;

  constructor(private db:AngularFireDatabase) { 
    this.productRef=this.db.list(this.db_path);
  }

  addNew(product:Product){
    return this.productRef.push(product);
  }

  getAll():AngularFireList<Product>{
    return this.productRef;
    
  }
}
