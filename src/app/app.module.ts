import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AllTemplateBackComponent } from './BackOffice/all-template-back/all-template-back.component';
import { FooterBackComponent } from './BackOffice/footer-back/footer-back.component';
import { NavbarBackComponent } from './BackOffice/navbar-back/navbar-back.component';
import { SidebarBackComponent } from './BackOffice/sidebar-back/sidebar-back.component';
import { AllTemplateFrontComponent } from './FrontOffice/all-template-front/all-template-front.component';
import { FooterFrontComponent } from './FrontOffice/footer-front/footer-front.component';
import { HeaderFrontComponent } from './FrontOffice/header-front/header-front.component';
import { HomeComponent } from './FrontOffice/home/home.component';
import { ListCompetitionComponent } from './BackOffice/list-competition/list-competition.component';
import { HttpClientModule } from '@angular/common/http';
import { AddCompetitionComponent } from './BackOffice/add-competition/add-competition.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Importez ReactiveFormsModule ici
import { ListCompetitionsComponent } from './FrontOffice/list-competitions/list-competitions.component';
import { AddProductComponent } from './BackOffice/add-product/add-product.component';
import { CommonModule } from '@angular/common';
import { ListProductComponent } from './BackOffice/list-product/list-product.component';
import { EditProductComponent } from './BackOffice/edit-product/edit-product.component';
import { CategorieProductComponent } from './BackOffice/categorie-product/categorie-product.component';
import { ListArchivedComponent } from './BackOffice/list-archived/list-archived.component';
import { ListCategoriesComponent } from './BackOffice/list-categories/list-categories.component';
import { ShowProductComponent } from './FrontProduct/show-product/show-product.component';
import { HeaderComponent } from './FrontProduct/header/header.component';
import { FooterComponent } from './FrontProduct/footer/footer.component';
import { AlltemplateFrontProductComponent } from './FrontProduct/alltemplate-front-product/alltemplate-front-product.component';
import { SideBarComponent } from './FrontProduct/side-bar/side-bar.component';

import { ProductDetailComponent } from './FrontProduct/product-detail/product-detail.component';
import { ViewProductComponent } from './FrontProduct/view-product/view-product.component';
import { CartComponent } from './FrontProduct/cart/cart.component';
import { CheckoutComponent } from './FrontProduct/checkout/checkout.component';


@NgModule({
  declarations: [
    AppComponent,
    AllTemplateBackComponent,
    FooterBackComponent,
    NavbarBackComponent,
    SidebarBackComponent,
    AllTemplateFrontComponent,
    FooterFrontComponent,
    HeaderFrontComponent,
    HomeComponent,
    ListCompetitionComponent,
    AddCompetitionComponent,
    ListCompetitionsComponent,
    AddProductComponent,
    ListProductComponent,
    EditProductComponent,
    CategorieProductComponent,
    
    ListArchivedComponent,
    ListCategoriesComponent,
    ShowProductComponent,
    HeaderComponent,
    FooterComponent,
    AlltemplateFrontProductComponent,
    SideBarComponent,
   
    ProductDetailComponent,
    ViewProductComponent,
    CartComponent,
    CheckoutComponent,
   
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule, // Ajoutez ceci pour utiliser ReactiveFormsModule
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
