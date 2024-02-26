import { Component } from '@angular/core';
import { Competition } from 'src/app/models/competition';
import { CompetitionService } from 'src/app/services/competition.service';

@Component({
  selector: 'app-list-competition',
  templateUrl: './list-competition.component.html',
  styleUrls: ['./list-competition.component.css']
})
export class ListCompetitionComponent {
  searchName: string = '';

  competitions ! : Competition[];
  constructor(private competitionService : CompetitionService){
  }

  ngOnInit(): void {
    console.log("HELLO FROM COMPETITIONS")
    this.AllCompetitions();

  }



  AllCompetitions(){

    this.competitionService.getAllCompetitions().subscribe(
      (data) =>{
        this.competitions=data;
        console.log(this.competitions)
      },(err) =>{
        console.log("ERROR WHILE FETCHING COMPETITION LIST ");
      }
    )
  }
  Close(id:number){
    this.competitionService.CloseCompetition(id).subscribe((data) =>{
      console.log("DATA : " , data);
      alert("Competition Closed Successfully :) ");
      window.location.reload();
    });
  
}
CompetitionByName(name:string) {
      
  this.competitionService.SearchCompetitionByName(name).subscribe(
    (data: Competition[]) => {
      console.log(data);
    },
    (error) => {
      console.error(error);
    }
  );
}
onSearch(): void {
  console.log('Search Name:', this.searchName);
  // ... rest of your code
  this.competitionService.SearchCompetitionByName(this.searchName).subscribe(
    (data: Competition[]) => {
      this.competitions = data; // Update competitions array with the search results
    },
    (error) => {
      console.error(error);
    }
  );
}
}
