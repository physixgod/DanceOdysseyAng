import { Component } from '@angular/core';
import { Event } from 'src/app/models/event';
import { EventService } from 'src/app/services/event.service';
@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.css']
})
export class EventsListComponent {
  events ! : Event[];
  event! : Event;
  maxDistance!: number;
  constructor(private eventservice : EventService){}


ngOnInit(): void {
  console.log("HELLO FROM EVENTS")
  this.Allevents();
  this.fetchEventsNearMe();

  

}
fetchEventsNearMe(): void {
  // Check if maxDistance is valid and not null or undefined
  if (this.maxDistance) {
    // Retrieve user's location
    navigator.geolocation.getCurrentPosition((position) => {
      const yourLatitude = position.coords.latitude;
      const yourLongitude = position.coords.longitude;
      
      // Call the event service to fetch events near the user's location
      this.eventservice.getEventsNearby(yourLatitude, yourLongitude, this.maxDistance).subscribe(
        (data) => {
          this.events = data;
          console.log("Events Near Me:", this.events);

          // Call getEventImage for each event to fetch its image
          this.events.forEach(event => {
            this.getEventImage(event);
          });
        },
        (error) => {
          console.error("Error fetching events near me:", error);
        }
      );
    }, (error) => {
      console.error("Error getting current location:", error);
    });
  } else {
    console.warn("Max distance is not specified.");
    this.Allevents();
  }
}



Allevents(): void {
  this.eventservice.getEvents().subscribe(
    (data) => {
      this.events = data;
      console.log(this.events);
      this.events.forEach(event => {
        this.getEventImage(event);
      });
    },
    (err) => {
      console.log("ERROR WHILE FETCHING events LIST ");
    }
  );
}
getEventImage(event: Event): void {
  this.eventservice.getEventImage(event.eventID).subscribe(
    (imageUrl: string) => {
      
      event.eventImage = imageUrl;
      console.log(event.eventImage);
    },
    (error) => {
      console.error("Error fetching event image:", error);
    }
  );
}

}


