import { Component, OnInit } from '@angular/core';
import { JuryManager } from 'src/app/models/jury';
import { JuryService } from 'src/app/services/jury.service';

@Component({
  selector: 'app-show-aprroved-juries',
  templateUrl: './show-aprroved-juries.component.html',
  styleUrls: ['./show-aprroved-juries.component.css']
})
export class ShowAprrovedJuriesComponent implements OnInit {
  approvedJuries: JuryManager[] = []; // Array to store approved juries

  constructor(private juryService: JuryService) {}

  ngOnInit(): void {
    this.getApprovedJuries(); // Call method to fetch approved juries when component initializes
  }

  getApprovedJuries() {
    // Call the service method to fetch approved juries
    this.juryService.getApprovedJuries().subscribe(
      (data) => {
        this.approvedJuries = data; // Assign the fetched data to the approvedJuries array
      },
      (error) => {
        console.error("Error fetching approved juries:", error); // Log error if any
      }
    );
  }
}
