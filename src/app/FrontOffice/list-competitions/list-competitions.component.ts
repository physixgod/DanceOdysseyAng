import { Component } from '@angular/core';
import { Competition } from 'src/app/models/competition';
import { CompetitionService } from 'src/app/services/competition.service';

@Component({
  selector: 'app-list-competitions',
  templateUrl: './list-competitions.component.html',
  styleUrls: ['./list-competitions.component.css']
})
export class ListCompetitionsComponent {
  competitions ! : Competition[];
  constructor(private CompetitionService : CompetitionService){}


ngOnInit(): void {
  console.log("HELLO FROM COMPETITIONS")
  this.AllCompetitions();

}



AllCompetitions(){

  this.CompetitionService.getAllCompetitions().subscribe(
    (data) =>{
      this.competitions=data;
      console.log(this.competitions)
    },(err) =>{
      console.log("ERROR WHILE FETCHING COMPETITION LIST ");
    }
  )
}

}
