import { Injectable } from '@angular/core';

import { PositionI } from 'src/utils/interfaces';

@Injectable({ providedIn: 'root' })
export class LocationService {
  constructor() {}

  getPosition(): Promise<PositionI> {
    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          // Navigator coordinates
          resolve({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
            zoom: 18,
          });
        },
        (error) => {
          // Default coordinates
          resolve({
            latitude: 4.711,
            longitude: -74.0721,
            zoom: 6,
          });
        }
      );
    });
  }
}
