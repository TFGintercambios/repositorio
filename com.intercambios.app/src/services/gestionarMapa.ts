import {Injectable,Component} from '@angular/core';
import {webServiceEndpoint} from './commons';
import {Http, Response, URLSearchParams, RequestOptions} from '@angular/http';
import {
 GoogleMaps,
 GoogleMap,
 GoogleMapsEvent,
 LatLng,
 CameraPosition,
 MarkerOptions,
 Marker
} from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import * as Rx from "rxjs/Rx";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publish';
import {obtenerPlazasService} from '../../src/services/obtenerPlazas';

@Injectable()
export class gestionarMapaService {

    private map:GoogleMap ;
	private posicion:Geolocation;

	constructor(private http: Http, private obtenerPlazas:obtenerPlazasService) {}

 
	pintarPlazas(){
       this.obtenerPlazas.getPlazas().subscribe((plazas)=>{
		
           for(var p=0; p<plazas.length; p++){
				let io: LatLng = new LatLng(plazas[p].latitud, plazas[p].longitud);
				console.log(plazas[p].titulo); 	
				let markerOptions: MarkerOptions = {
					position: io,
					title: plazas[p].titulo
					};
	    		this.map.addMarker(markerOptions).then((marker: Marker) => {
					});
				console.log('Plaza: '+plazas[p].titulo);
 			}
 	    });
	}

	geolocalizarMapa(latitud, longitud){
		console.log(latitud+'  :  '+longitud);
		 let ionic: LatLng = new LatLng(latitud, longitud);
	let markerOptions: MarkerOptions = {
					position: ionic,
					title: 'tu posicion'
				};
				this.map.addMarker(markerOptions).then((marker: Marker) => {
					marker.showInfoWindow();
					});
	let position: CameraPosition = {
		target: ionic,
		zoom: 13
		};
	this.map.moveCamera(position);

}
	posIni(){
			let ionic: LatLng = new LatLng(37.3849900,-5.990608699999900);
		 let position: CameraPosition = {
			 target: ionic,
			   zoom: 13
 };
  this.map.moveCamera(position);
	}
 

 setMap(gmap:GoogleMap){
    this.map=gmap;
 }

 private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }
}