import { Component } from '@angular/core';
import { Competition } from 'src/app/models/competition';
import { CompetitionService } from 'src/app/services/competition.service';

@Component({
  selector: 'app-add-competition',
  templateUrl: './add-competition.component.html',
  styleUrls: ['./add-competition.component.css']
})
export class AddCompetitionComponent {

  competition: Competition = {
    competitionName: '',
    danceCategory: '',
    startDate: new Date(), // or initialize with the appropriate date
    endDate: new Date(),
    location: '',
    rating: 0,
    prize: '',
    description:'',
    maxParticipants: 0,
    status: '',
    competitionID: 0,
    participations: [],
    jurymanagers: []
  };

  constructor(private competitionService : CompetitionService){

  }

  ngOnInit(): void {
  }

  addCompetition(){
    this.competitionService.addNewCompetition(this.competition).subscribe(
      (data) =>{
        console.log("DATA : " , data);
        alert("Competition Added Successfully :) ");
        window.location.reload();

      }
    )
  }

}
