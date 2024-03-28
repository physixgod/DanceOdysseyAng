import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule,Routes } from '@angular/router';
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
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { AddCompetitionComponent } from './BackOffice/add-competition/add-competition.component';
import { FormsModule } from '@angular/forms';
import { ListCompetitionsComponent } from './FrontOffice/list-competitions/list-competitions.component';
import { AddEventComponent } from './FrontOffice/add-event/add-event.component';
import { UserRegisterComponent } from './FrontOffice/user-register/user-register.component';
import { TableadminComponent } from './BackOffice/tableadmin/tableadmin.component';
import { UserLoginComponent } from './FrontOffice/user-login/user-login.component';
import { TokenInterceptor } from './services/token.interceptor';
import { ReactiveFormsModule } from '@angular/forms';
import { RecaptchaModule, RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha';
import { UsereditComponent } from './FrontOffice/useredit/useredit.component'; 


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
    AddEventComponent,
    UserRegisterComponent,
    TableadminComponent,
    UserLoginComponent,
    UsereditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RecaptchaModule 
    

  ],
  providers: [
    {
      provide: RECAPTCHA_V3_SITE_KEY, // Provide RECAPTCHA_V3_SITE_KEY token
      useValue: '6LdCdJMpAAAAAKltrUz-qET2XZVRliujyOkTXmvy' // Replace with your actual reCAPTCHA site key
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent] 
})
export class AppModule { }
