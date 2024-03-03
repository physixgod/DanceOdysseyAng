import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllTemplateBackComponent } from './BackOffice/all-template-back/all-template-back.component';
import { AllTemplateFrontComponent } from './FrontOffice/all-template-front/all-template-front.component';
import { HomeComponent } from './FrontOffice/home/home.component';
import { ListCompetitionComponent } from './BackOffice/list-competition/list-competition.component';
import { AddCompetitionComponent } from './BackOffice/add-competition/add-competition.component';
import { ListCompetitionsComponent } from './FrontOffice/list-competitions/list-competitions.component';
import { AddEventComponent } from './FrontOffice/add-event/add-event.component';
import { ListCoursesComponent } from './FrontOffice/list-courses/list-courses.component'; // Importez ListCoursesComponent
import { AddCourseComponent } from './BackOffice/add-course/add-course.component';
//import { AddCourseComponent } from './FrontOffice/add-course/add-course.component'; // Importez AddCourseComponent

const routes: Routes = [
  {
    path: "",
    component: AllTemplateFrontComponent,
    children: [
      { path: 'homepage', component: HomeComponent },
      { path: 'competitions', component: ListCompetitionsComponent },
      { path: 'addevent', component: AddEventComponent },
      { path: 'courses', component: ListCoursesComponent }, // Nouveau chemin pour la liste des cours
      { path: 'add-course', component: AddCourseComponent } // Nouveau chemin pour l'ajout d'un cours
    ]
  },
  {
    path: "admin",
    component: AllTemplateBackComponent,
    children: [
      { path: 'list-competition', component: ListCompetitionComponent },
      { path: 'add-competition', component: AddCompetitionComponent },
      { path: 'list-courses', component: ListCoursesComponent }, // Nouveau chemin pour la liste des cours dans la partie admin
      { path: 'add-course', component: AddCourseComponent } // Nouveau chemin pour l'ajout d'un cours dans la partie admin
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
