import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JuryManager } from 'src/app/models/jury';
import { JuryService } from 'src/app/services/jury.service';

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
      console.log(this.competitionId); // Move the console.log here
      this.getAllAffectedJuries(); // Call getAllAffectedJuries method
    });
  }

  getAllAffectedJuries() {
    // Call the service method to fetch all juries affected by the competition
    this.juryService.showAffectedJuries(this.competitionId).subscribe(
      (data) => {
        this.juries = data;
        console.log(this.juries);
      },
      (err) => {
        console.log("ERROR WHILE FETCHING Affected Juries LIST ");
      }
    );
  }

  
}
