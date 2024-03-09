import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Competition } from 'src/app/models/competition';
import { CompetitionService } from 'src/app/services/competition.service';

@Component({
  selector: 'app-readmore-competitions',
  templateUrl: './readmore-competitions.component.html',
  styleUrls: ['./readmore-competitions.component.css']
})
export class ReadmoreCompetitionsComponent implements OnInit {

  competition!: Competition;
  registrationSuccess: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private competitionService: CompetitionService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const competitionID = +params['id'];
      this.competitionService.getCompetitionById(competitionID).subscribe(
        (data) => {
          this.competition = data;
        },
        (err) => {
          console.log('ERROR WHILE FETCHING COMPETITION DETAILS: ', err);
        }
      );
    });
  }
registerForCompetition(): void {
    const dancerID = 1; 

    this.competitionService.affecterDancerCompetition(this.competition.competitionID, dancerID).subscribe(
      (response) => {
        console.log('Successfully registered for the competition', response);
        this.registrationSuccess = true;
      },
      (error) => {
        console.error('Error registering for the competition', error);
      }
    );
  }
}
