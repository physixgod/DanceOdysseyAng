import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllTemplateBackComponent } from './BackOffice/all-template-back/all-template-back.component';
import { AllTemplateFrontComponent} from './FrontOffice/all-template-front/all-template-front.component';
import { ListCompetitionComponent } from './BackOffice/list-competition/list-competition.component';
import { AddCompetitionComponent } from './BackOffice/add-competition/add-competition.component';
import { HomeComponent } from './FrontOffice/home/home.component';
import { ListCompetitionsComponent } from './FrontOffice/list-competitions/list-competitions.component';
import { AddEventComponent } from './FrontOffice/add-event/add-event.component';
import { UserRegisterComponent } from './FrontOffice/user-register/user-register.component';
import { TableadminComponent } from './BackOffice/tableadmin/tableadmin.component';
import { UserLoginComponent } from './FrontOffice/user-login/user-login.component';
import { config } from 'rxjs';
import { AuthGuardService } from './services/AuthGuardService';
import { UsereditComponent } from './FrontOffice/useredit/useredit.component';



const routes: Routes = [
{ path:"",
  component: AllTemplateFrontComponent,
  children:[
    {path:'homepage', component: HomeComponent, canActivate:[AuthGuardService] },
    {path:'competitions', component:ListCompetitionsComponent,canActivate:[AuthGuardService]},
    {path:'addevent', component:AddEventComponent,canActivate:[AuthGuardService]},
 
    
  ]
},
{ path: 'login', component: UserLoginComponent }, // Ad
{
  path:'register',component:UserRegisterComponent
},
{
  path: 'profile',
  component: UsereditComponent
},
{
  path:"admin",
  component: AllTemplateBackComponent,
  canActivate:[AuthGuardService],
  children: [
    { path: 'list-competition', component: ListCompetitionComponent },
    { path: 'add-competition', component: AddCompetitionComponent },
    { path: 'list-event', component: AddCompetitionComponent },
    {path: 'usersList', component: TableadminComponent},
    {path:'useredit',component:UsereditComponent}

    
  ]
},
{path:'**', redirectTo : 'homepage'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes), RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule],
  providers: [AuthGuardService]
})
export class AppRoutingModule { }
