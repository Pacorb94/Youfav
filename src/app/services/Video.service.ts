import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Video } from '../models/Video';

@Injectable()
export class VideoService{
    private url:string;

    constructor(private _http:HttpClient){
        this.url='http://localhost:8081/api';
    }

    /**
     * Función que obtiene todos los vídeos de un usuario
     * @param token
     * @param idUser
     * @param page
     * @return
     */
    getUserVideos(token:string, idUser:number, page:number):Observable<any>{
        let headers=new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                    .set('Authorization', token);
        return this._http.get(`${this.url}/users/${idUser}/videos?page=${page}`, {headers:headers});
    }

    /**
     * Función que obtiene un vídeo
     * @param token 
     * @param idVideo 
     * @return
     */
    getVideo(token:string, idVideo:number):Observable<any>{
        let headers=new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                    .set('Authorization', token);
        return this._http.get(`${this.url}/videos/${idVideo}`, {headers:headers});
    }

    /**
     * Función que añade a favoritos un vídeo
     * @param token
     * @param video
     */
    addFav(token:string, video:Video):Observable<any>{
        //Tenemos que convertir el vídeo a json-string
        let data=JSON.stringify(video); 
        //Los datos por la url
        let params=`json=${data}`;
        //Establecemos el tipo de cabecera
        let headers=new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                    .set('Authorization', token);
        return this._http.post(`${this.url}/videos/create`, params, {headers:headers});
    
    }

    /**
     * Función que modifica un vídeo
     * @param token 
     * @param user 
     * @return
     */
    update(token:string, video:any):Observable<any>{
        //Tenemos que convertir el vídeo a json-string
        let data=JSON.stringify(video);
        let params=`json=${data}`;
        let headers=new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                    .set('Authorization', token);
        return this._http.put(`${this.url}/videos/${video.id}/update`, params, {headers:headers});
    }

    /**
     * Función que borra el vídeo
     * @param token 
     * @param idVideo 
     * @return
     */
    delete(token:string, idVideo:number):Observable<any>{
        let headers=new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                    .set('Authorization', token);
        return this._http.delete(`${this.url}/videos/${idVideo}/delete`, {headers:headers});
    }
}