import { Component } from '@angular/core';
import { Competition } from 'src/app/models/competition';
import { CompetitionService } from 'src/app/services/competition.service';

@Component({
  selector: 'app-list-competition',
  templateUrl: './list-competition.component.html',
  styleUrls: ['./list-competition.component.css']
})
export class ListCompetitionComponent {

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

}
