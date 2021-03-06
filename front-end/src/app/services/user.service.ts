import { Injectable } from '@angular/core'
import { Http, Response, Headers } from '@angular/http'
import "rxjs/add/operator/map"
import { Observable } from 'rxjs/Observable'
import { GLOBAL } from './global'

@Injectable()
export class UserService{
    public url: string
    public identity
    public token

    constructor(private _http: Http){
        this.url = GLOBAL.urlApi
    }

    reister(user_to_register){
        let parms = JSON.stringify(user_to_register)
        let headers = new Headers({'Content-type': 'application/json'})

        return this._http.post(this.url + 'register', parms, {headers: headers})
                .map(res => res.json())
    }

    signup(user_to_login, gettoken = null){
        if (gettoken != null) {
            user_to_login.getToken = gettoken
        }
        let parms = JSON.stringify(user_to_login)
        let headers = new Headers({'Content-type': 'application/json'})
        return this._http.post(this.url + 'login', parms, {headers: headers})
                    .map(res => res.json())
    }

    getIdentity(){
        let identity = JSON.parse(localStorage.getItem('identity'))
        if (identity != 'undefined') {
            this.identity = identity
        } else {
            this.identity = null
        }
        return this.identity
    }

    getToken(){
        let token = localStorage.getItem('token')
        if (token != 'undefined') {
            this.token = token
        } else {
            this.token = null
        }
        return this.token
    }
}