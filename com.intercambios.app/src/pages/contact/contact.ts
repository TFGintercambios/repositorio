import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {obtenerPlazasService} from '../../services/obtenerPlazas';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
  providers: [obtenerPlazasService]
})
export class ContactPage {
	public plaz;
	
  constructor(public navCtrl: NavController, public plazaService:obtenerPlazasService) {

  }
	ionViewDidLoad(){

    this.plazaService.getPlazas().subscribe(plazas => this.plaz = plazas);
}


 
}