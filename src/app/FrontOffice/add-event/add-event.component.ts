import { Component } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { Event } from 'src/app/models/event';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent {
  event: Event = {
    eventName: '',
    startDate: new Date(),
    location: '',
    maxParticipants: 0,
    eventID: 0,
    description: ''
  };

  dancerId: number = 1; // Replace with the actual dancer ID, or get it dynamically

  constructor(private eventService: EventService) {}

  ngOnInit(): void {}

  addEventByDancer() {
    this.eventService.addEventByDancer(this.dancerId, this.event).subscribe(
      (data) => {
        console.log("DATA: ", data);
        alert("Event Added Successfully :)");
        window.location.reload();
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
