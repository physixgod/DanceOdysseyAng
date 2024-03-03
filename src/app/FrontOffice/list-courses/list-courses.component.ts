import { Component } from '@angular/core';
import { Course } from 'src/app/models/course'; // Importez Course
import { CourseService } from 'src/app/services/course'; // Importez CourseService

@Component({
  selector: 'app-list-courses', // Changez le sélecteur du composant
  templateUrl: './list-courses.component.html',
  styleUrls: ['./list-courses.component.css']
})
export class ListCoursesComponent { // Changez le nom de la classe
  courses!: Course[]; // Modifiez le nom de la propriété

  constructor(private courseService: CourseService) {} // Changez le nom du service

  ngOnInit(): void {
    console.log("HELLO FROM COURSES")
    this.getAllCourses(); // Modifiez le nom de la méthode
  }

  getAllCourses() { // Modifiez le nom de la méthode
    this.courseService.getAllCourses().subscribe(
      (data) => {
        this.courses = data;
        console.log(this.courses);
      },
      (err) => {
        console.log("ERROR WHILE FETCHING COURSE LIST ");
      }
    );
  }
}
