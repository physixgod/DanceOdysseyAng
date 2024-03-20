import { Component, OnInit } from '@angular/core';
import { JuryManager } from '../models/jury';
import { JuryService } from '../services/jury.service';

@Component({
  selector: 'app-registerjury',
  templateUrl: './registerjury.component.html',
  styleUrls: ['./registerjury.component.css']
})
export class RegisterjuryComponent implements OnInit {

  juryManager: JuryManager = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    telNumber: '',
    expertiseArea: '',
    diploma: '',
    juryID: 0,
    archived: false,
    imageUrl: ''
  };

  selectedFile: File | undefined;

  constructor(private juryService: JuryService) { }

  ngOnInit(): void {
    // Votre code d'initialisation ici
  }

  addJury(): void {
    this.juryService.addJury(this.juryManager).subscribe(
      (addedJury: JuryManager) => {
        console.log("Jury added successfully: ", addedJury);
        alert("Jury Added Successfully.");
  
        if (this.selectedFile) {
          this.uploadImage(addedJury.juryID);
        } else {
          // Reload the page only if there's no image to upload
          window.location.reload();
        }
      },
      (error: any) => {
        console.error("Error adding jury: ", error);
        alert("Failed to add jury. Please try again.");
      }
    );
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadImage(id: number): void {
    if (this.selectedFile) {
      this.juryService.uploadImage(this.selectedFile, id).subscribe(
        (data: any) => {
          console.log("Image uploaded successfully: ", data);
          alert("Image uploaded successfully.");
          window.location.reload(); // Reload the page after the image upload completes
        },
        (error: any) => {
          console.error("Error uploading image: ", error);
          alert("Failed to upload image. Please try again.");
        }
      );
    } else {
      alert("Please select an image file.");
    }
  }}