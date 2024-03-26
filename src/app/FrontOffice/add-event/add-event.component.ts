import { Component, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
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
    description: '',
    latitude: 0,
    longitude: 0,
    eventImage: '',
    currentParticipants: 0
  };
  uploadedImage: File | null = null;
  eventAdded: boolean = false;
  eventId: number = 0; 
  dancerId: number = 1;
  marker: any = null;
  circleMarker: any = null;
  collocationOffer: any = {}; //
  constructor(
    private elementRef: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object,
    private eventService: EventService
  ) {}

  ngAfterViewInit(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const userLocation = [position.coords.latitude, position.coords.longitude];
        console.log('User Location:', userLocation);
        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${userLocation[0]}&lon=${userLocation[1]}&zoom=18&addressdetails=1`)
          .then(response => response.json())
          .then(data => {
            const city = data.address?.city;
            console.log('User City:', city);
          })
          .catch(error => {
            console.error('Error fetching city:', error);
          });
        
       
      }, (error) => {
        console.error('Error getting current location:', error);
      });
    }
    if (isPlatformBrowser(this.platformId)) {
      import('leaflet').then(leaflet => {
        const map = leaflet.map(this.elementRef.nativeElement.querySelector('#map')).setView([36.8065, 10.1815], 13); // Set initial view to Tunis, Tunisia

        leaflet.tileLayer('https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png', {
          maxZoom: 20,
          attribution: '<a href="https://github.com/cyclosm/cyclosm-cartocss-style/releases" title="CyclOSM - Open Bicycle render">CyclOSM</a> | Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        map.on('click', (e: any) => {
          console.log(`LatLng: ${e.latlng.lat}, ${e.latlng.lng}`);
          this.event.latitude = e.latlng.lat;
    this.event.longitude = e.latlng.lng;
          if (this.marker) {
            map.removeLayer(this.marker);
          }
          this.collocationOffer.locationLx = e.latlng.lng;
          this.collocationOffer.locationLy = e.latlng.lat;
          this.marker = leaflet.marker([e.latlng.lat, e.latlng.lng]).addTo(map)
            .bindPopup(`Latitude: ${e.latlng.lat}, Longitude: ${e.latlng.lng}`);
          this.getAddressFromCoords(e.latlng.lat, e.latlng.lng).then((address) => {
            this.collocationOffer.governorate = address.state || '';
            this.collocationOffer.country = address.country || '';
            this.collocationOffer.city = address.city || '';
            this.collocationOffer.streetAddress = address.road || '';
            console.log(`Country: ${address.country}, Governorate: ${address.state}, City: ${address.city}, Street: ${address.road}, lx: ${e.latlng.lat}, ly: ${e.latlng.lng}`);
            this.event.location = `${address.city}, ${address.road}`;
          });
        });

        map.on('dblclick', (e: any) => {
          if (this.circleMarker) {
            map.removeLayer(this.circleMarker);
          }
          this.circleMarker = leaflet.circleMarker([e.latlng.lat, e.latlng.lng], {
            color: 'red',
            weight: 4,
            radius: 150
          }).addTo(map);
        });

        map.on('contextmenu', (e: any) => {
          console.log(e);
        });
      }).catch(error => {
        console.error('Error loading Leaflet', error);
      });
      this.watchPosition();
    }
  }

  watchPosition() {
    let desLat = 0;
    let desLon = 0;
    let id = navigator.geolocation.watchPosition((position) => {
      console.log(`lat:${position.coords.latitude}, long:${position.coords.longitude}`);
      if (position.coords.latitude === desLat || position.coords.longitude === desLon) {
        navigator.geolocation.clearWatch(id);
      }
    }, (err) => {
      console.log(err);
    }, {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    });
  }

  async getAddressFromCoords(latitude: number, longitude: number): Promise<any> {
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`);
    const data = await response.json();
    return {
      country: data.address?.country,
      state: data.address?.state,
      city: data.address?.city,
      road: data.address?.road
    };
  }



  onFileSelected(event: any) {
    this.uploadedImage = event.target.files[0];
  }

  // Method to add event by dancer
  addEventByDancer() {
    const locationParts = this.event.location.split(',').map(part => part.trim());
    const city = locationParts[0];
    const street = locationParts.slice(1).join(', '); 
    console.log('City:', city);
    console.log('Street:', street);
    
    this.eventService.addEventByDancer(this.dancerId, this.event).subscribe(
      (data) => {
        console.log("Event Added Successfully:", data);
        this.eventId = data.eventID;
        this.eventAdded = true;

        // Upload event image after event addition
        this.uploadEventImage();
      },
      (error) => {
        console.error("Error Adding Event:", error);
      }
    );
  }

  // Method to upload event image
  uploadEventImage() {
    if (this.uploadedImage) {
      this.eventService.updateEventImage(this.eventId, this.uploadedImage).subscribe(
        (data) => {
          console.log("Event Image Uploaded Successfully:", data);
          alert("Event and Image Uploaded Successfully");
          window.location.reload();
        },
        (error) => {
          console.error("Error Uploading Event Image:", error);
          alert("Error Uploading Event Image");
          window.location.reload();
        }
      );
    }
  }
}