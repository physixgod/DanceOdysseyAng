// test.component.ts
import { Component, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { OfferService } from '../offer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent {
  imageName: any;
  marker: any = null;
  circleMarker: any = null;
  collocationOffer: any = {}; // Define this object according to your requirements
  
  constructor(private elementRef: ElementRef, @Inject(PLATFORM_ID) private platformId: Object, private offerService: OfferService, private router: Router) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      import('leaflet').then(leaflet => {
        const map = leaflet.map(this.elementRef.nativeElement.querySelector('#map')).setView([36.8065, 10.1815], 13); // Set initial view to Tunis, Tunisia

        leaflet.tileLayer('https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png', {
          maxZoom: 20,
          attribution: '<a href="https://github.com/cyclosm/cyclosm-cartocss-style/releases" title="CyclOSM - Open Bicycle render">CyclOSM</a> | Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        map.on('click', (e: any) => {
          console.log(`LatLng: ${e.latlng.lat}, ${e.latlng.lng}`);
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
}
