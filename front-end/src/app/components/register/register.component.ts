import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { GLOBAL } from '../../services/global';

import { UserService } from '../../services/user.service';



@Component({
    selector: 'register',
    templateUrl: './register.component.html',
    providers: [
        UserService
    ]
})

export class RegisterComponent implements OnInit {
    public title: string
    public user: User
    public status: string

    constructor(private _route: ActivatedRoute, _router: Router, private _userService: UserService ) {
        this.title = 'Registro'
        this.user = new User('','','','','','ROLE_USER','');
    }

    ngOnInit(){
        console.log('register.component loaded...')
    }

    onSubmit(registerForm){
        this._userService.reister(this.user).subscribe(
            response => {
                if (response.user && response.user._id) {
                    this.status = 'sucess'
                    this.user = new User('','','','','','ROLE_USER','')
                    registerForm.reset()
                }
                else {
                    this.status = 'error'
                }
            },
            error =>{
                console.log(<any> error)
            }
        )
    }
}