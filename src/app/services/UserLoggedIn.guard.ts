import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from 'src/app/services/User.service';

/**
 * Clase que almacena un guard para proteger las rutas
 */
@Injectable()
export class UserLoggedInGuard implements CanActivate{
    private userLoggedIn:any;

    constructor(private _router:Router, private _userService:UserService){
        this.userLoggedIn=this._userService.getUserLoggedIn();
    }

    /**
     * Función que comprueba que el usuario logueado no acceda a 
     * las rutas de login y register
     * @return
     */
    canActivate():boolean {
        if (this.userLoggedIn) {
            this._router.navigate(['/']);
            return false;
        }
        return true;
    }
}