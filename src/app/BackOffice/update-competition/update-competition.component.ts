  import { Component, OnInit } from '@angular/core';
  import { ActivatedRoute } from '@angular/router';
  import { Competition } from 'src/app/models/competition';
  import { CompetitionService } from 'src/app/services/competition.service';
  import { Router } from '@angular/router';

  @Component({
    selector: 'app-update-competition',
    templateUrl: './update-competition.component.html',
    styleUrls: ['./update-competition.component.css']
  })
  export class UpdateCompetitionComponent implements OnInit {
    competition: Competition = {
      competitionName: '',
      danceCategory: '',
      startDate: new Date(),
      endDate: new Date(),
      location: '',
      rating: 0,
      prize: '',
      description: '',
      maxParticipants: 0,
      status: '',
      competitionID: 0,
      participations: [],
      jurymanagers: []
    };

    constructor(
      private route: ActivatedRoute,
      private competitionService: CompetitionService,
      private router: Router
    ) {}

    ngOnInit(): void {
      this.route.params.subscribe(params => {
      const competitionID = +params['id'];

      this.competitionService.getCompetitionById(competitionID).subscribe(
          (data) => {
            this.competition = data;
          },
          (error) => {
            console.error('Error fetching competition details:', error);
          }
        );
      });
    }

    addCompetition(): void {
      this.competitionService.addNewCompetition(this.competition).subscribe(
        (data) => {
          console.log('DATA: ', data);
          alert('Competition Updated Successfully :) ');
          this.router.navigate(['/admin/list-competition']);

        },
        (error) => {
          console.error('Error adding competition:', error);
        }
      );
    }
  }
