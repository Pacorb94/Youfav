import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { User } from '../models/User';

@Injectable()
export class UserService{
    private url:string;    
    //Token del usuario
    private token:any;
  
    constructor(private _http:HttpClient){
        this.url='http://videosfavoritos.com/api';
    }

    /**
     * Función que regitra a un usuario
     * @param user 
     */
    register(user:User):Observable<any>{
        //Tenemos que convertir el usuario a json-string
        let data=JSON.stringify(user); 
        //Los datos por la url
        let params=`json=${data}`;
        //Establecemos el tipo de cabecera
        let headers=new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.post(`${this.url}/register`, params, {headers:headers});
    }

    /**
     * Función que inicia sesión
     * @param user 
     * @param getToken ? indica opcional
     */
    login(user:User, getToken?:boolean):Observable<any>{
        //Si tiene valor
        if (getToken) user.setGetToken(true); 
        //Tenemos que convertir el usuario a json-string
        let data=JSON.stringify(user); 
        //Los datos por la url
        let params=`json=${data}`;
        //Establecemos el tipo de cabecera
        let headers=new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.post(`${this.url}/login`, params, {headers:headers});
    }

    /**
     * Función que obtiene el usuario logueado
     * @return
     */
    getUserLoggedIn():any{
        let localStorageUser=null;
        if (localStorage.hasOwnProperty('user')) {
            localStorageUser=JSON.parse(localStorage.getItem('user')||'{}');
        }      
        return localStorageUser;
    }

    /**
     * Función que obtiene el token del usuario logueado
     * @return
     */
    getToken():any{
        if (localStorage.hasOwnProperty('token')){
            this.token=localStorage.getItem('token');
        }else{
            this.token=null;
        }
        return this.token;
    }

    /**
     * Función que modifica un usuario
     * @param token 
     * @param user 
     * @return
     */
    update(token:string, user:any):Observable<any>{
        //Tenemos que convertir el usuario a json-string
        let data=JSON.stringify(user);
        let params=`json=${data}`;
        let headers=new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                    .set('Authorization', token);
        return this._http.put(`${this.url}/users/${user.id}/update`, params, {headers:headers});
    }
}