import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './component/about-us/about-us.component';
import { ManageProductComponent } from './component/admin/manage-product/manage-product.component';

import { ContactComponent } from './component/contact/contact.component';
import { DefaultComponent } from './component/default/default.component';
import { HomeComponent } from './component/default/home/home.component';

import { ProductComponent } from './component/product/product.component';


const routes: Routes = [
  {path:'',component:DefaultComponent,
  children:[
    {path:'',component:HomeComponent},
    {path:'products',component:ProductComponent},
    {path:'aboutus',component:AboutUsComponent},
    {path:'contact',component:ContactComponent}
  ]
  },
 
  {path:'admin',component:ManageProductComponent},
  {path:'contact',component:ContactComponent},
  {path:'aboutus',component:AboutUsComponent},
  {path:'products',component:ProductComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
