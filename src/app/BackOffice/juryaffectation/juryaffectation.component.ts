import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JuryManager } from 'src/app/models/jury';
import { JuryService } from 'src/app/services/jury.service';

@Component({
  selector: 'app-juryaffectation',
  templateUrl: './juryaffectation.component.html',
  styleUrls: ['./juryaffectation.component.css']
})
export class JuryaffectationComponent implements OnInit {
  searchName: string = '';
  competitionId!: number; // Variable to store the competition ID



  juries!: JuryManager[];

  constructor(
    private juryService: JuryService,
    private route: ActivatedRoute // Inject ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Retrieve the competition ID from the route parameters
    this.route.params.subscribe(params => {
      this.competitionId = params['competitionId'];
      console.log(this.competitionId); // Move the console.log here
      this.getAlljuries(); // Call getAlljuries method
    });
  }

  getAlljuries() {
    // Call the service method to fetch all juries
    this.juryService.showNotAffectedJuries(this.competitionId).subscribe(
      (data) => {
        this.juries = data;
        console.log(this.juries);
      },
      (err) => {
        console.log("ERROR WHILE FETCHING Juries LIST ");
      }
    );
  }

  addJuryToCompetition(juryId: number) {
    // Call the service method to add the jury to the competition
    this.juryService.setJuries(this.competitionId, juryId).subscribe(
      () => {
        console.log("Jury added to the competition successfully.");
        // Optionally, you can update the juries list after adding the jury to the competition
        this.getAlljuries();
        window.location.reload();
      },
      (err) => {
        console.log("Error while adding jury to the competition: ", err);
      }
    );
  }
  onSearch(): void {
    console.log('Search Name:', this.searchName);
  
    if (this.searchName.trim() === '') {
      // If the search input is empty, fetch all competitions
      this.getAlljuries();
    } else {
      // If there's a search input, search competitions by name
      this.juryService.searchJuryByName(this.searchName).subscribe(
        (data: JuryManager[]) => {
          this.juries = data;
        },
        (error) => {
          console.error(error);
        }
      );
   
    }
  }
}
