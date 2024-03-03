import { Component } from '@angular/core';
import { JuryService } from 'src/app/services/jury.service';
import { JuryManager } from 'src/app/models/jury';

@Component({
  selector: 'app-jury-list',
  templateUrl: './jurylist.component.html',
  styleUrls: ['./jurylist.component.css']
})
export class JuryListComponent {

  juryManager: JuryManager = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    telNumber: '',
    expertiseArea: '',
    diploma: '',
    juryID: 0,
    archived: false
    
    
  };

  constructor(private juryService: JuryService) { }

  ngOnInit(): void {
  }

  addJury(): void {
    this.juryService.addJury(this.juryManager).subscribe(
      (data: any) => {
        console.log("DATA: ", data);
        alert("Jury Added Successfully :) ");
        window.location.reload();
      },
      (error: any) => {
        console.error("Error adding jury: ", error);
        alert("Failed to add jury. Please try again.");
      }
    );
  }

}
