import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompetitionService } from '../services/competition.service';

@Component({
  selector: 'app-competition-ranks',
  templateUrl: './competition-ranks.component.html',
  styleUrls: ['./competition-ranks.component.css']
})
export class CompetitionRanksComponent {

  competitionID!: number;
  ranks: Map<string, number> = new Map();
  ranksArray: { dancerName: string; rank: number }[] = [];
  dataLoaded: boolean = false;

  constructor(private route: ActivatedRoute, private competitionService: CompetitionService) { }

  ngOnInit(): void {    
    this.route.params.subscribe(params => {
      this.competitionID = +params['id'];
      if (this.competitionID !== undefined) {
        this.competitionService.getRanks(this.competitionID).subscribe(
          data => {
            console.log('Original data:', data);
            if (data instanceof Map) {
              this.ranks = data;
            } else if (data && typeof data === 'object') {
              this.ranks = new Map(Object.entries(data));
            } else {
              console.error('Invalid data format:', data);
              return;
            }
            this.ranksArray = Array.from(this.ranks.entries()).map(([dancerName, rank]) => ({
              dancerName: dancerName,
              rank: rank
            }));

            console.log('Mapped array:', this.ranksArray);

            this.dataLoaded = true;
          },
          error => {
            console.error('Error fetching ranks:', error);
          }
        );
      }
    });
  }
}
