import { Component, OnInit,Inject } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { ManageProductService } from 'src/app/service/manage-product.service';
import { finalize, map, tap } from 'rxjs/operators';
import Product from 'src/app/model/product';

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.css']
})
export class ManageProductComponent implements OnInit {

  p_name:String='';
  p_des:String='';
  p_price:String='';
  p_img:String='';

  selectedFile:any=null;
  product:Product=new Product();
  productList:any;
  constructor(private storage:AngularFireStorage,private proSer:ManageProductService) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  showPreview(event:any){
    this.selectedFile=event.target.files[0];
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
      this.productList=data;
      console.log(data);
    })
  }

  save(){
    const path=`products/${Date.now()}_${this.selectedFile.name}`;
    const ref=this.storage.ref(path);

    this.storage.upload(path,this.selectedFile).snapshotChanges().pipe(
      finalize(()=>{
        ref.getDownloadURL().subscribe((url)=>{
          this.product.key=Math.random().toString();
          this.product.imgUrl=url;
          this.product.name=this.p_name;
          this.product.desciption=this.p_des;
          this.product.price=this.p_price;
          this.proSer.addNew(this.product).then((result)=>{
            console.log("create new Item success");
            console.log(result);
            this.p_des="";
            this.p_name="";
            this.p_price=""
            this.p_img="";
          })
        })
      })
    ).subscribe();

    
  }

}
