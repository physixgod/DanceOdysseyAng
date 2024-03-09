import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Event } from 'src/app/models/event';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-upgrade-event',
  templateUrl: './upgrade-event.component.html',
  styleUrls: ['./upgrade-event.component.css']
})
export class UpgradeEventComponent implements OnInit {
  eventID!: number;
  event: Event = {
    eventName: '',
    startDate: new Date(),
    location: '',
    maxParticipants: 0,
    eventID: 0,
    description: ''
  };

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get the event ID from the route parameter
    this.route.params.subscribe(params => {
      this.eventID = +params['id']; // Corrected assignment

      // Fetch the event details based on the ID
      this.eventService.getEventById(this.eventID).subscribe(
        (data) => {
          this.event = data;
        },
        (error) => {
          console.error(error);
        }
      );
    });
  }

  updateEvent() {
    this.eventService.addEvent(this.event).subscribe( // Corrected method name
      (data) => {
        console.log('Event updated successfully:', data);
        // Redirect to another page after updating (replace 'my-events' with your actual route)
        this.router.navigate(['/MyEvents']);
      },
      (error) => {
        console.error('Error updating event:', error);
      }
    );
  }
}
