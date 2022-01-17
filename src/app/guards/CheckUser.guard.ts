import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from 'src/app/services/User.service';

@Injectable()
/**
 * Clase que almacena un guard para proteger las rutas si el 
 * usuario no está logueado
 */
export class CheckUserGuard implements CanActivate{
    private userLoggedIn:any;

    constructor(private _router:Router, private _userService:UserService){
        this.userLoggedIn=this._userService.getUserLoggedIn();
    }

    /**
     * Función que comprueba que el usuario ha iniciado sesión
     * @return
     */
    canActivate():boolean {
        if (this.userLoggedIn) return true;
        this._router.navigate(['/login']);
        return false;
    }
}