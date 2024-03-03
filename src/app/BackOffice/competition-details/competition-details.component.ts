import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Competition } from 'src/app//models/competition';
import { JuryService } from 'src/app//services/jury.service';
import { CompetitionService } from 'src/app/services/competition.service';

@Component({
  selector: 'app-competition-details',
  templateUrl: './competition-details.component.html',
  styleUrls: ['./competition-details.component.css']
})
export class CompetitionDetailsComponent {

  searchName: string = '';

  competitions ! : Competition[];
  constructor(private competitionService : JuryService,private router: Router){
  }

  ngOnInit(): void {
    console.log("HELLO FROM COMPETITIONS")
    this.AllCompetitions();

  }
  redirectToPage1(competitionId: number) {
    this.router.navigate(['/admin', 'jurieslistaffectation', competitionId]);
  }
  redirectToPage2(competitionId: number) {
    this.router.navigate(['/admin', 'showAffectedJuries', competitionId]);
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



  