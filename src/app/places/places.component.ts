import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Place } from './place/place.model';

import { PlaceService } from './place.service';

import { SearchPipe } from '../../pipes/search.pipe';
import { ActivePipe } from '../../pipes/active.pipe';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.css']
})
export class PlacesComponent implements OnInit {
  places: Place[];

  constructor(
    private placeService: PlaceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
    const coords = {
      lat: 0,
      long: 0
    };

    navigator.geolocation.getCurrentPosition(position => {
      coords.lat = position.coords.latitude;
      coords.long = position.coords.longitude;

      const placeType = this.route.snapshot.paramMap.get('placeType');

      this.places = this.placeService.getPlaces(placeType, coords);
    });

  }
}