import { Injectable } from '@angular/core'
import { Http, Response, Headers } from '@angular/http'
import "rxjs/add/operator/map"
import { Observable } from 'rxjs/Observable'
import { GLOBAL } from './global'

@Injectable()
export class UserService{
    public url: string

    constructor(private _http: Http){
        this.url = GLOBAL.urlApi
    }

    reister(user_to_register){
        let parms = JSON.stringify(user_to_register)
        let headers = new Headers({'Content-type': 'application/json'})

        return this._http.post(this.url + 'register', parms, {headers: headers})
                .map(res => res.json())
    }
}