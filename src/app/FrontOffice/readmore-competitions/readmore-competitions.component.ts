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

  constructor(
    private route: ActivatedRoute,
    private competitionService: CompetitionService
  ) {}

  ngOnInit(): void {
    // Retrieve the competition ID from the route parameters
    this.route.params.subscribe(params => {
      const competitionID = +params['id'];

      // Fetch the details of the competition based on its ID
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
}
