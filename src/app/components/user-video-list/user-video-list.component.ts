import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/User.service';
import { VideoService } from './../../services/Video.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'user-video-list',
    templateUrl: './user-video-list.component.html',
    styleUrls: ['./user-video-list.component.scss'],
    providers:[VideoService]
})
export class UserVideoListComponent implements OnInit {
    pageTitle: string;
    userLoggedIn: any;
    //Token del usuario
    token: string;
    userVideos: any;
    //Servirá para comprobar si los temas se han cargado
    loading: boolean;
    //------Paginación-------
    page: any;
    prevPage: number;
    nextPage: number;
    totalPages: number[];

    constructor(private _userService: UserService, private _videoService: VideoService,
    private _router: Router, private _route: ActivatedRoute) {
        this.pageTitle = 'Mis vídeos';
        this.userLoggedIn=this._userService.getUserLoggedIn();
        this.token = this._userService.getToken();
        this.loading = true;
        this.prevPage = 0;
        this.nextPage = 0;
        this.totalPages = [];
    }

    ngOnInit(): void {
        this.getRoutePage();
    }

    /**
     * Función que obtiene la página de la ruta
     */
    getRoutePage() {
        this._route.params.subscribe(
            params => {
                this.page = params['page'];
                //Si tiene valor y es un número sino será el por defecto
                if (this.page && this.page.match(/[\d]+/)) {
                    this.page = Number.parseInt(this.page);
                } else {
                    this.page = 1;
                    this.prevPage = 1;
                    this.nextPage = 2;
                }
                this.getUserVideos();
            }
        );
    }

    /**
     * Función que obtiene los vídeos del usuario
     */
    getUserVideos() {
        this._videoService.getUserVideos(this.token, this.userLoggedIn.id, this.page).subscribe(
            response => {
                //Si hay vídeos
                if (response.videos.length) {
                    this.loading = false;
                    this.userVideos = response.videos;
                    this.pagination(response.totalPages);
                } else {
                    this.loading = true;
                }
            },
            error => {
                this._router.navigate(['/']);
            }
        );
    }

    /**
     * Función que hace la paginación de los vídeos
     * @param totalPages
     */
    pagination(totalPages: any) {
        //Reiniciamos la variable
        this.totalPages = [];
        for (let page = 1; page <= totalPages; page++) this.totalPages.push(page);
        //Si la página actual es la 2 o más, la página anterior será 1 menos a la actual sino será la 1
        if (this.page >= 2) {
            this.prevPage = this.page - 1;
        } else {
            this.prevPage = 1;
        }
        /*Si la página actual es menor al total de páginas, la página siguiente será la actual más 1 sino
        la página siguiente será la última*/
        if (this.page < totalPages) {
            this.nextPage = this.page + 1;
        } else {
            this.nextPage = totalPages;
        }
    }

    /**
     * Función que obtiene la miniatura de un vídeo
     * @param url 
     * @param size
     */
    getThumb(url: string, size: string) {
        let video, results, thumburl;
        if (url === null) return '';
        //Buscamos el identificado de la url
        results = url.match('[\\?&]v=([^&#]*)');
        video = (results === null) ? url : results[1];
        //Si llega el tamaño la miniatura será de ese tamaño sino pues por el tamaño por defecto
        if (size != null) {
            thumburl = 'http://img.youtube.com/vi/' + video + '/' + size + '.jpg';
        } else {
            thumburl = 'http://img.youtube.com/vi/' + video + '/mqdefault.jpg';
        }
        return thumburl;
    }

    /**
     * Función que ve un vídeo
     * @param videoId 
     */
    watchVideo(videoId:number){
        this._router.navigate(['/watch-video', videoId]);
    }

    /**
     * Función que borra un vídeo
     * @param id
     */
    deleteVideo(id: number) {
        this._videoService.delete(this.token, id).subscribe(
            response => {
                //Cuando borramos se actualiza la lista de vídeos
                this.getUserVideos();
            },
            error => {
                this._router.navigate(['/']);
            }
        );
    }
}
