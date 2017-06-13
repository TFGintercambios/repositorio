import { Component } from '@angular/core';
import { NavController, Platform  } from 'ionic-angular';
import {
 GoogleMaps,
 GoogleMap,
 GoogleMapsEvent,
 LatLng,
 CameraPosition,
 MarkerOptions,
 Marker
} from '@ionic-native/google-maps';

import {Http, Response, URLSearchParams, RequestOptions} from '@angular/http';

import { Geolocation } from '@ionic-native/geolocation';

import {obtenerPlazasService} from '../../services/obtenerPlazas';

declare var google;
declare var map;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [obtenerPlazasService]
})
export class HomePage{
	public plaz;
	public i;
	plazas:any;
	result:any; 
	public datos;
	public plat;
	
	
  constructor(public navCtrl: NavController, private googleMaps: GoogleMaps, private geolocation:Geolocation, private plazaService:obtenerPlazasService, private http: Http, platform: Platform ) {
	this.plat=platform;
  }

  ngAfterViewInit() {
     this.plat.ready().then(() => {    
      // La plataforma esta lista y ya tenemos acceso a los plugins.
        this.obtenerMarcadores();
     });
  }
  
 obtenerMarcadores():any{
    this.plazaService.getPlazas().subscribe(response => {
			//obtenemos las plazas desde la api y hacemos la llamada a loadmap pasandole las plazas cuando estén disponibles
      this.loadMap(response);
    });
  }
  
 
loadMap(plazas) {
	this.plaz=plazas;
	let element: HTMLElement = document.getElementById('map');

	let map: GoogleMap = this.googleMaps.create(element);

	map.one(GoogleMapsEvent.MAP_READY).then(() => console.log('Map is ready!'));

	for(var p=0; p<plazas.length; p++){
	let io: LatLng = new LatLng(plazas[p].latitud, plazas[p].longitud);
	console.log(plazas[p].titulo); 	
	let markerOptions: MarkerOptions = {
		position: io,
		title: plazas[p].titulo
		};
	map.addMarker(markerOptions).then((marker: Marker) => {
		marker.showInfoWindow();
		});
 }
 
 let ionic: LatLng = new LatLng(37.362444, -5.9965);
	let position: CameraPosition = {
		target: ionic,
		zoom: 13
		};
	map.moveCamera(position);
	
	
 }
 
}