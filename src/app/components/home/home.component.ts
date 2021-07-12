import { Component, DoCheck } from '@angular/core';
import { UserService } from 'src/app/services/User.service';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements DoCheck{
    userLoggedIn:any;

    constructor(private _userService: UserService) {}

    ngDoCheck() {
        this.loadUser();
    }

    /**
     * Función que carga el usuario
     */
    loadUser() {
        //Para que no se ejecute muchas veces el DoCheck
        if (this.userLoggedIn!=this._userService.getUserLoggedIn()) {
            this.userLoggedIn = this._userService.getUserLoggedIn();   
        }
    }  
}
