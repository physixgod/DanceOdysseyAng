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
    jurymanagers: [],
    competitionImage: ''
  };

  uploadedImage: File | null = null;
  competitionAdded: boolean = false;
  competitionId: number = 0; 

  constructor(private competitionService : CompetitionService) {}

  addCompetition() {
    this.competitionService.addNewCompetition(this.competition).subscribe(
      (data) => {
        console.log("Competition Added:", data);
        this.competitionId = data.competitionID;
        this.competitionAdded = true;
      },
      (error) => {
        console.error("Error adding competition:", error);
      }
    );
  }

  uploadCompetitionImage() {
    if (this.uploadedImage) {
      this.competitionService.updateCompetitionImage(this.competitionId, this.uploadedImage).subscribe(
        (data) => {
          console.log("Competition Image Uploaded:", data);
          alert("Competition Image Uploaded Successfully");
          window.location.reload();
        },
        (error) => {
          console.error("Error uploading competition image:", error);
        }
      );
    } else {
      alert("Please select an image to upload.");
    }
  }

  onFileSelected(event: any) {
    this.uploadedImage = event.target.files[0];
  }
}
