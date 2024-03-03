import { Component, NgModule } from '@angular/core';
import { Course } from 'src/app/models/course';
import { CourseService } from 'src/app/services/course';
import { FormsModule  } from "@angular/forms";
import { AppComponent } from 'src/app/app.component';
import { BrowserModule } from '@angular/platform-browser';
@NgModule({
  declarations: [
    AppComponent, VideoColorSpace, EventTarget,
  ],
  imports: [
    BrowserModule,  FormsModule

  ],
//  providers: [ApiServices],
  bootstrap: [AppComponent]
})
export class AppModule { }
@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent {

  course: Course = {
    courseName: '',
    description: '',
    category: '',
    requiredSkillLevel: '',
    durationInHours: 0,
    videoLink: '',
    courseId: 0,
    startDate: new Date(),
    endDate: new Date(),
    location: '',
    maxParticipants: 0
  };

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {}

  addCourse() {
    this.courseService.addNewCourse(this.course).subscribe(
      (data) =>{
        console.log("DATA : " , data);
        alert("Course Added Successfully :) ");
        window.location.reload();
      }
    )
  }
}
