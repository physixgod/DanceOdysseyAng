import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JuryManager } from 'src/app/models/jury';
import { JuryService } from 'src/app/services/jury.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-showaffectedjuries',
  templateUrl: './showaffectedjuries.component.html',
  styleUrls: ['./showaffectedjuries.component.css']
})
export class ShowaffectedjuriesComponent implements OnInit {
  juries: JuryManager[] = []; // Array to store affected juries
  competitionId!: number;

  constructor(
    private juryService: JuryService,
    private route: ActivatedRoute // Inject ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Retrieve the competition ID from the route parameters
    this.route.params.subscribe(params => {
      this.competitionId = params['competitionId'];
      this.getAllAffectedJuries(); // Call getAllAffectedJuries method
    });
  }

  getAllAffectedJuries() {
    // Call the service method to fetch all juries affected by the competition
    this.juryService.showAffectedJuries(this.competitionId).pipe(
      catchError(error => {
        console.error('Error loading affected juries:', error);
        return of([]);
      })
    ).subscribe(
      (juries: JuryManager[]) => {
        this.juries = juries;
        this.loadImagesForAllJuries();
      },
      (err) => {
        console.error("ERROR WHILE FETCHING Affected Juries LIST ");
      }
    );
  }

  loadImagesForAllJuries(): void {
    this.juries.forEach(jury => {
      this.loadImageForJury(jury);
    });
  }

  loadImageForJury(jury: JuryManager): void {
    this.juryService.getImageForJury(jury.juryID).subscribe(
      (response: any) => {
        if (response instanceof Blob) {
          const imageUrl = URL.createObjectURL(response);
          jury.imageUrl = imageUrl;
        } else {
          console.error(`Image response is not a Blob for jury ${jury.juryID}`);
          jury.imageUrl = ''; // Set a default image or empty string
        }
      },
      error => {
        console.error(`Error loading image for jury ${jury.juryID}:`, error);
        jury.imageUrl = ''; // Set a default image or empty string
      }
    );
  }
}
