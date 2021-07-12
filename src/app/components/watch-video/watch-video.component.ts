import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/User.service';
import { VideoService } from './../../services/Video.service';
import { Router, ActivatedRoute } from '@angular/router';
//Para que funcione un vídeo de youtube
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'watch-video',
    templateUrl: './watch-video.component.html',
    styleUrls: ['./watch-video.component.scss'],
    providers: [UserService, VideoService]
})
export class WatchVideoComponent implements OnInit {
    userLoggedIn:any;
    //Token del usuario
    token:string;
    video:any;

    constructor(private _userService:UserService, private _videoService:VideoService, 
    private _router:Router, private _route:ActivatedRoute, private _sanitizer:DomSanitizer) {
        this.userLoggedIn=this._userService.getUserLoggedIn();
        this.token=this._userService.getToken();   
    }

    ngOnInit(): void {
        this.getRouteVideo();
    }

    /**
     * Función que obtiene el vídeo
     */
    getRouteVideo(){
        this._route.params.subscribe(
            params=>{
                let videoId=params['id'];
                //Si es un número sino se redirige a la página principal
                if (videoId.match(/[\d]+/)){
                    videoId=Number.parseInt(videoId);   
                    this.getVideo(videoId);
                }else{
                    this._router.navigate(['/']);
                }          
            }
        );
    }

    /**
     * Función que obtiene un vídeo
     * @param videoId 
     */
    getVideo(videoId:number){
        this._videoService.getVideo(this.token, videoId).subscribe(
            response=>{
                this.video=response;                     
            },
            error=>{
                this._router.navigate(['/']);       
            }
        );      
    }

    /**
     * Función que obtiene una url embebida a partir de una url
     * @param url 
     */
    getEmbedUrl(url:string) {
        let video, results;
        if (url === null) return '';   
        results=url.match('[\\?&]v=([^&#]*)');
        video=(results === null) ? url : results[1];   
        return this._sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/'+video+'?autoplay=1');   
    } 
}
