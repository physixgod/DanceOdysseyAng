import { Component } from '@angular/core';
import { Competition } from 'src/app//models/competition';
import { Router } from '@angular/router';
import { JuryService } from 'src/app//services/jury.service';

@Component({
  selector: 'app-judging-criteria',
  templateUrl: './judging-criteria.component.html',
  styleUrls: ['./judging-criteria.component.css']
})
export class JudgingCriteriaComponent {
  searchName: string = '';

  competitions ! : Competition[];
  constructor(private competitionService : JuryService,private router: Router){
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
