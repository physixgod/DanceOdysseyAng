import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Competition } from 'src/app/models/competition';
import { JuryService } from 'src/app/services/jury.service';

@Component({
  selector: 'app-judging-criteria',
  templateUrl: './judging-criteria.component.html',
  styleUrls: ['./judging-criteria.component.css']
})
export class JudgingCriteriaComponent implements OnInit {
  searchName: string = '';
  selectedFile: File | null = null;
  competitionId: number | undefined;
  competition: Competition | undefined;

  constructor(
    private competitionService: JuryService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.competitionId = +params['competitionId'];
      
    });
  }

 

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    if (!this.selectedFile) {
      console.error('No file selected.');
      return;
    }

    if (!this.competitionId) {
      console.error('No competition ID found.');
      return;
    }

    this.competitionService.uploadExcelFile(this.competitionId, this.selectedFile).subscribe(
      response => {
        console.log('File uploaded successfully', response);
        // Optionally, you can navigate to another page or perform additional actions here
      },
      error => {
        console.error('Failed to upload file', error);
        // Handle error gracefully, show error message to the user, etc.
      }
    );
  }
}
