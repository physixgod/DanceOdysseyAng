import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../models/course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private baseURL = "http://localhost:8081/course/";

  constructor(private http: HttpClient) { }

  getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.baseURL + 'ShowCourses');
  }

  addNewCourse(c: Course): Observable<Course> {
    return this.http.post<Course>(this.baseURL + 'AddCourseUpdate', c);
  }

  closeCourse(id: number): Observable<Course> {
    return this.http.put<Course>(`${this.baseURL}UpdateCourseStatus/${id}`, id);
  }

  searchCourseByName(name: string): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.baseURL}SearchCourseByName/${name}`);
  }
}
