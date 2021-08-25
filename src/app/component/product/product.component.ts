import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { ManageProductService } from 'src/app/service/manage-product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  productsList:any;

  constructor(private proSer:ManageProductService) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(){
    this.proSer.getAll().snapshotChanges().pipe(
      map(changes=>
        changes.map(c=>({
          key:c.payload.key,
          ...c.payload.val()
        }))
      )
    ).subscribe((data)=>{
      this.productsList=data;
      console.log(data);
    })
  }

}
