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
    eventName: '', // Example: You can add more attributes as needed
    startDate: new Date(),
    location: '',
    maxParticipants: 0,
    eventID: 0,
    description:''
  };

  constructor(private eventService: EventService) {}

  ngOnInit(): void {}

  addEvent() {
    this.eventService.addEvent(this.event).subscribe(
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
