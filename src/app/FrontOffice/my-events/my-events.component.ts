import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { Event } from 'src/app/models/event';

@Component({
  selector: 'app-my-events',
  templateUrl: './my-events.component.html',
  styleUrls: ['./my-events.component.css']
})
export class MyEventsComponent implements OnInit {
  myCreatedEvents: Event[] = [];
  dancerId: number = 1; // Replace with the actual dancer ID, or get it dynamically
  router: any;

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.fetchMyCreatedEvents();
  }

  fetchMyCreatedEvents() {
    this.eventService.showMyCreatedEvents(this.dancerId).subscribe(
      (data) => {
        this.myCreatedEvents = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  updateEvent(event: Event) {
    this.router.navigate(['/upgradevent', event.eventID]);
  }
  deleteEvent(eventId: number) {
    const confirmDelete = confirm("Are you sure you want to delete this event?");

    if (confirmDelete) {
      this.eventService.deleteEvent(eventId).subscribe(
        () => {
          console.log('Event deleted successfully');
          // Refresh the event list after deletion
          this.fetchMyCreatedEvents();
        },
        (error) => {
          console.error('Error deleting event:', error);
        }
      );
    }
  }
  
}
