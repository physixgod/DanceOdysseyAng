import { Component } from '@angular/core';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-tableadmin',
  templateUrl: './tableadmin.component.html',
  styleUrls: ['./tableadmin.component.css']
})
export class TableadminComponent {

  users ! : User[];
  constructor(private userService : UserService){
  }

  ngOnInit(): void {
    console.log("HELLO FROM COMPETITIONS")
    this.Allusers();

  }



  Allusers(){

    this.userService.getAllUsers().subscribe(
      (data) =>{
        this.users=data;
        console.log(this.users)
      },(err) =>{
        console.log("ERROR WHILE FETCHING USERS LIST ");
      }
    )
  }
  banUser(userId: number): void {
    console.log(userId);
    this.userService.deleteUser(userId).subscribe(() => {
      console.log("User deleted successfully");
      alert("User deleted successfully");
      window.location.reload(); // Refresh the page
    }, error => {
      console.error("Error occurred while deleting user:", error);
      alert("Error occurred while deleting user");
      // Handle error if deletion fails
    });
  }}