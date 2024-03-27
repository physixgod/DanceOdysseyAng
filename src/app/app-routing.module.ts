import { SideBarComponent } from './FrontProduct/side-bar/side-bar.component';
import { SidebarBackComponent } from './BackOffice/sidebar-back/sidebar-back.component';
import { CheckoutComponent } from './FrontProduct/checkout/checkout.component';
import { CartComponent } from './FrontProduct/cart/cart.component';
import { ViewProductComponent } from './FrontProduct/view-product/view-product.component';
import { ProductDetailComponent } from './FrontProduct/product-detail/product-detail.component';
import { AlltemplateFrontProductComponent } from './FrontProduct/alltemplate-front-product/alltemplate-front-product.component';
import { ShowProductComponent } from './FrontProduct/show-product/show-product.component';
import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllTemplateBackComponent } from './BackOffice/all-template-back/all-template-back.component';
import { AllTemplateFrontComponent} from './FrontOffice/all-template-front/all-template-front.component';
import { ListCompetitionComponent } from './BackOffice/list-competition/list-competition.component';
import { AddCompetitionComponent } from './BackOffice/add-competition/add-competition.component';
import { HomeComponent } from './FrontOffice/home/home.component';
import { ListCompetitionsComponent } from './FrontOffice/list-competitions/list-competitions.component';
import { AddProductComponent } from './BackOffice/add-product/add-product.component';
import { ListProductComponent } from './BackOffice/list-product/list-product.component';
import { EditProductComponent } from './BackOffice/edit-product/edit-product.component';
import { CategorieProductComponent } from './BackOffice/categorie-product/categorie-product.component';
import { ListArchivedComponent } from './BackOffice/list-archived/list-archived.component';
import { ListCategoriesComponent } from './BackOffice/list-categories/list-categories.component';


const routes: Routes = [
{ path:"",
  component: AllTemplateFrontComponent,
  children:[
    {path:'homepage', component: HomeComponent },
    {path:'competitions', component:ListCompetitionsComponent},

  ]
},
{
  path:"product",
  component: AlltemplateFrontProductComponent,
  children: [
    {path:'detailproduct',component:ProductDetailComponent},
    {path:'viewproduct/:id',component:ViewProductComponent},
    {path:'cart',component:CartComponent},
    {path:'checkout',component:CheckoutComponent},
    {path:'show',component:ShowProductComponent},
    {path:'side',component:SideBarComponent},



    

  ]
  


},


{
  path:"admin",
  component: AllTemplateBackComponent,
  children: [
    { path: 'list-competition', component: ListCompetitionComponent },
    { path: 'add-competition', component: AddCompetitionComponent },
    { path: 'list-event', component: AddCompetitionComponent },
    {path:'add-product',component:AddProductComponent},
    { path:'list-product',component:ListProductComponent},
    
{path:'edit-product/:id',component:EditProductComponent},
{path:'add-Categoriesproduct',component:CategorieProductComponent},
{path:'list_Archived',component:ListArchivedComponent},
{path:'list_Categories',component:ListCategoriesComponent},




    
  ]
},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
