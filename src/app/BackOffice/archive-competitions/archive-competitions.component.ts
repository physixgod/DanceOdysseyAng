import { Component } from '@angular/core';
import { Competition } from '../../models/competition';
import { CompetitionService } from '../../services/competition.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-archive-competitions',
  templateUrl: './archive-competitions.component.html',
  styleUrls: ['./archive-competitions.component.css']
})
export class ArchiveCompetitionsComponent {
  searchName: string = '';

  competitions ! : Competition[];
  constructor(private router: Router,private competitionService : CompetitionService){
  }

  ngOnInit(): void {
    console.log("HELLO FROM COMPETITIONS")
    this.getarchivedCompetitions();

  }



  getarchivedCompetitions(){

    this.competitionService.getArchivedCompetitions().subscribe(
      (data) =>{
        this.competitions=data;
        console.log(this.competitions)
      },(err) =>{
        console.log("ERROR WHILE FETCHING COMPETITION LIST ");
      }
    )
  }
  navigateToLeaderboard(competitionID: number) {
    this.router.navigate(['/admin/leaderboard', competitionID]);
  }
}
