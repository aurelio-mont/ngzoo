import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { GLOBAL } from '../../services/global';

import { UserService } from '../../services/user.service';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    providers: [
        UserService
    ]
})

export class LoginComponent implements OnInit {
    public title: String
    public user: User
    public status: string
    public identity
    public token
    public message: string

    constructor(private _route: ActivatedRoute,private _router: Router, private _userService: UserService ) {
        this.title = 'Indentificate'
        this.user = new User('','','','','','ROLE_USER','')
    }

    ngOnInit(){
        console.log('login.component loaded...')
    }

    onSubmit(loginForm){
        this._userService.signup(this.user).subscribe(
            response => {
                this.identity = response.user
                if (!response.user) {
                    alert('Datos incorrectos')
                } else {
                    this.identity.password = ''
                    localStorage.setItem('identity', JSON.stringify(this.identity))
                    this._userService.signup(this.user, 'true').subscribe(
                        response => {
                            this.token = response.token
                            if (!this.token) {
                                alert('Datos incorrectos')
                            } else {
                                localStorage.setItem('token', this.token)    
                                this.status = 'success'
                                this._router.navigate(['/home'])
                            }
                        },
                        err => {
                            console.log(<any> err)
                        }
                    ) 
                }
            },
            err => {
                var errorMessage = <any> err
                if (errorMessage != null) {
                    var body = JSON.parse(err._body)
                    this.message = body.message
                    this.status = 'error'
                    loginForm.reset()
                }
            }
        )
    }
}