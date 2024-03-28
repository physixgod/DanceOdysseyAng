import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/User';
@Injectable({
    providedIn: 'root'
  })
  export class UserService{
    private baseURL = "http://localhost:8086/user/";
    constructor(private http : HttpClient) { }
    addNewUser(u : User):Observable<User>{
        return this.http.post<User>(this.baseURL+'addNewUser' , u);
      }
      getAllUsers():Observable<User[]>{
        return this.http.get<User[]>(this.baseURL+'showusers')
      }
      deleteUser(userId: number): Observable<any> {
        return this.http.delete(`${this.baseURL}deleteUser/${userId}`);
      }
      loginUser(username: string, password: string): Observable<any> {
        console.log({ username, password });
        
        return this.http.post<any>(`${this.baseURL}generateToken`, { username : username, password : password });
  
  }
  getCurrentUser(currentUserUrl: string): Observable<User> {
    return this.http.get<User>(currentUserUrl);}
    getUserByUsername(username: string): Observable<User> {
      return this.http.get<User>(`${this.baseURL}getUser/${username}`);
    }
  }

