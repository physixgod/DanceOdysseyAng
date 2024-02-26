import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllTemplateBackComponent } from './BackOffice/all-template-back/all-template-back.component';
import { AllTemplateFrontComponent} from './FrontOffice/all-template-front/all-template-front.component';
import { ListCompetitionComponent } from './BackOffice/list-competition/list-competition.component';
import { AddCompetitionComponent } from './BackOffice/add-competition/add-competition.component';
import { HomeComponent } from './FrontOffice/home/home.component';
import { ListCompetitionsComponent } from './FrontOffice/list-competitions/list-competitions.component';
import { AddEventComponent } from './FrontOffice/add-event/add-event.component';


const routes: Routes = [
{ path:"",
  component: AllTemplateFrontComponent,
  children:[
    {path:'homepage', component: HomeComponent },
    {path:'competitions', component:ListCompetitionsComponent},
    {path:'addevent', component:AddEventComponent}
  ]
},
{
  path:"admin",
  component: AllTemplateBackComponent,
  children: [
    { path: 'list-competition', component: ListCompetitionComponent },
    { path: 'add-competition', component: AddCompetitionComponent },
    { path: 'list-event', component: AddCompetitionComponent },

    
  ]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
