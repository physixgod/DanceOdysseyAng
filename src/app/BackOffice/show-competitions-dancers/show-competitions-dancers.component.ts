import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dancer } from 'src/app/models/competition';
import { CompetitionService } from 'src/app/services/competition.service';

@Component({
  selector: 'app-show-competitions-dancers',
  templateUrl: './show-competitions-dancers.component.html',
  styleUrls: ['./show-competitions-dancers.component.css']
})
export class ShowCompetitionsDancersComponent implements OnInit {

  competitionId!: number;
  dancers: Dancer[] = [];

  constructor(private route: ActivatedRoute, private competitionService: CompetitionService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.competitionId = +params['id'];
      this.showDancers();
    });
  }

  showDancers(): void {
    this.competitionService.getCompetitionDancers(this.competitionId).subscribe(
      (data) => {
        this.dancers = data;
      },
      (error) => {
        console.error('Error fetching dancers:', error);
      }
    );
  }
}
