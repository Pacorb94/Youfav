import { Component, DoCheck } from '@angular/core';
import { UserService } from 'src/app/services/User.service';
import { Router } from '@angular/router';

@Component({
    selector: 'navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements DoCheck {
    userLoggedIn:any;

    
    constructor(private _userService:UserService, private _router: Router){}

    ngDoCheck(){
        this.loadUser();
    }

    /**
     * Función que carga el usuario
     */
    loadUser(){  
        //Para que no se ejecute muchas veces el DoCheck
        if (this.userLoggedIn!=this._userService.getUserLoggedIn()) {
            this.userLoggedIn=this._userService.getUserLoggedIn();
        }                                                            
    }

    /**
     * Función que cierra sesión
     */
    logout(){
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        this.userLoggedIn = null;
        this._router.navigate(['/']);
    }
}


