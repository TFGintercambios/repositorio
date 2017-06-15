import {Injectable} from '@angular/core';
import {webServiceEndpoint} from './commons';
import {Http, Response, URLSearchParams, RequestOptions} from '@angular/http';
import * as Rx from "rxjs/Rx";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publish';

@Injectable()
export class obtenerPlazasService {
    posts:any;
	constructor(private http: Http) {}
	
    
 
	getPlazas(){
       let res = this.http.get('http://evening-sea-67773.herokuapp.com/api/plazaPropia/all').map(this.extractData).publish().refCount();
		return res;
	}
 

 
 private extractData(res: Response) {
        let body = res.json();
        return body;
    }
}