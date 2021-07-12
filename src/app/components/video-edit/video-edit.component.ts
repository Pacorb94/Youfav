import { FlashMessagesService } from 'angular2-flash-messages';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/User.service';
import { VideoService } from './../../services/Video.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Video } from 'src/app/models/Video';


@Component({
    selector: 'video-edit',
    templateUrl: './video-edit.component.html',
    styleUrls: ['./video-edit.component.scss'],
    providers: [UserService, VideoService]
})
export class VideoEditComponent implements OnInit{
    pageTitle:string;
    userLoggedIn:any;
    //Token del usuario
    token:string;
    video:Video;
    form:FormGroup;

    constructor(private _userService:UserService, private _videoService:VideoService, 
    private _router:Router, private _route:ActivatedRoute, 
    private _flashMessagesService:FlashMessagesService) {
        this.pageTitle='Modificar vídeo';
        this.userLoggedIn=this._userService.getUserLoggedIn();
        this.token=this._userService.getToken();
        this.video=new Video(null, this.userLoggedIn.id, '', '', '');   
        this.form=new FormGroup({
            title:new FormControl('', Validators.required),
            description:new FormControl(''),
            url:new FormControl('', 
                [
                    Validators.required, 
                    Validators.pattern("^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+$")
                ]
            )
        });    
    }

    ngOnInit(): void {
        this.getRouteVideo(); 
    }

    /**
     * Función que obtiene el vídeo de la ruta
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
                this.setFormValues(response);
                this.video.setValues(response.id, response.title, response.description, 
                    response.url);                      
            },
            error=>{
                this._router.navigate(['/']);       
            }
        );    
    }

    /**
     * Función que establece los value de los inputs con la respuesta
     * @param response 
     */
    setFormValues(response:any){
        this.form.get('title')?.setValue(response.title);
        this.form.get('description')?.setValue(response.description);
        this.form.get('url')?.setValue(response.url); 
    }

    /**
     * Función que modifica un vídeo
     */
    editVideo(){
        if (this.form.valid) {        
            this.setVideoFormValues();
            this._videoService.update(this.token, this.video).subscribe(
                response=>{
                    if (response) {
                        this._router.navigate(['/video-list']); 
                    }else{
                        this.showFlashMessage('No has modificado correctamente', 
                            'alert alert-danger col-md-5 mt-3 mx-auto', 1500);
                    }       
                },
                error=>{
                    this.showFlashMessage('No has modificado correctamente', 
                        'alert alert-danger col-md-5 mt-3 mx-auto', 1500);
                }
            )
        }
    }

    /**
     * Función que da los valores del formulario al vídeo
     */
    setVideoFormValues(){
        this.video.setTitle(this.form.get('title')?.value);
        this.video.setUrl(this.form.get('url')?.value);
        if (this.form.get('description')?.value) {
            this.video.setDescription(this.form.get('description')?.value);
        }
    }

    /**
     * Función que muestra un mensaje flash
     * @param message
     * @param cssClass
     * @param timeout
     */
    showFlashMessage(message:string, cssClass:string, timeout:number){
        this._flashMessagesService.show(message,
            {
                cssClass:cssClass,
                timeout:timeout
            }
        );
    }

    /**
     * Función que comprueba si el foco está en el campo
     * @param field
     */
    checkTouched(field:any):boolean{
        if (field.touched) return true;    
        return false;
    }

    /**
     * Función que muestra un mensaje de validación incorrecta
     * @param field 
     * @param fieldName 
     */
    wrongValidationMessage(field:any, fieldName:string):string{
        let message='';
        //Con ? le decimos que puede haber errores sino no funciona
        if (field.errors?.pattern) {
            message=`El campo ${fieldName} es incorrecto`;        
        }else if(field.errors?.required){
            message=`El campo ${fieldName} debe estar relleno`;
        }
        return message;
    }
}
