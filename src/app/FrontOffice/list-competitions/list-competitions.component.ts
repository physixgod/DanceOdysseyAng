import { Component, OnInit } from '@angular/core';
import { Competition } from 'src/app/models/competition';
import { CompetitionService } from 'src/app/services/competition.service';

@Component({
  selector: 'app-list-competitions',
  templateUrl: './list-competitions.component.html',
  styleUrls: ['./list-competitions.component.css']
})
export class ListCompetitionsComponent implements OnInit {
  competitions: Competition[] = [];
  constructor(private competitionService: CompetitionService) {}
  ngOnInit(): void {
    this.getAllCompetitions();
  }
  getAllCompetitions(): void {
    this.competitionService.getAllCompetitions().subscribe(
      (data: Competition[]) => {
        this.competitions = data;
        this.fetchCompetitionImages();
      },
      (error) => {
        console.error("Error fetching competition list:", error);
      }
    );
  }

  fetchCompetitionImages(): void {
    this.competitions.forEach((competition) => {
      this.competitionService.getCompetitionImage(competition.competitionID).subscribe(
        (imageUrl: string) => {
          competition.competitionImage = imageUrl;
        },
        (error) => {
          console.error("Error fetching competition image:", error);
        }
      );
    });
  }
  

}
