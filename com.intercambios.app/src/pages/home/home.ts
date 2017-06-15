import { Component } from '@angular/core';
import { NavController, Platform  } from 'ionic-angular';
import {
 GoogleMaps,
 GoogleMap,
 GoogleMapsEvent,
 LatLng,
 CameraPosition
} from '@ionic-native/google-maps';

import {Http, Response} from '@angular/http';

import { Geolocation } from '@ionic-native/geolocation';

import {gestionarMapaService} from '../../services/gestionarMapa';

declare var google;
declare var map;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [gestionarMapaService]
})
export class HomePage{
	public plaz;
	public i;
	plazas:any;
	result:any; 
	public datos;
	public plat;
	public localizacion;
	
	
  constructor(public navCtrl: NavController, private googleMaps: GoogleMaps, private gestionarMapa:gestionarMapaService, private http: Http, private geolocation:Geolocation, platform: Platform ) {
		this.plat=platform;
		this.localizacion=geolocation;
  }

  ngAfterViewInit() {
     this.plat.ready().then(() => {    
      // La plataforma esta lista y ya tenemos acceso a los plugins.
			this.loadMap();
     });

  }     
 
loadMap(){	
 

	let element: HTMLElement = document.getElementById('map');

	let map: GoogleMap = this.googleMaps.create(element);

	map.one(GoogleMapsEvent.MAP_READY).then(() => {
		console.log('Map is ready!');
		this.gestionarMapa.setMap(map);		
		this.gestionarMapa.pintarPlazas();
		this.gestionarMapa.posIni();
		this.localizar();
 });


}

localizar(){
let watch = this.geolocation.watchPosition();
watch.subscribe((data) => {
 // data can be a set of coordinates, or an error (if an error occurred).
 // data.coords.latitude
 // data.coords.longitude
 this.gestionarMapa.geolocalizarMapa(data.coords.latitude, data.coords.longitude);	
});
	
}
}