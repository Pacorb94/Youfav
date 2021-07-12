import { FlashMessagesService } from 'angular2-flash-messages';
import { Component } from '@angular/core';
import { Video } from '../../models/Video';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { VideoService } from 'src/app/services/Video.service';
import { UserService } from 'src/app/services/User.service';
import { Router } from '@angular/router';

@Component({
    selector: 'add-video',
    templateUrl: './add-video.component.html',
    styleUrls: ['./add-video.component.scss'],
    providers:[VideoService, UserService]
})
export class AddVideoComponent {
    pageTitle:string;
    form:FormGroup;
    userLoggedIn:any;
    //Token del usuario
    token:string;
    video:Video;

    constructor(private _userService:UserService, private _videoService:VideoService, 
    private _flashMessagesService:FlashMessagesService, private _router:Router) 
    { 
        this.pageTitle='Añadir a favoritos';
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
        this.userLoggedIn=this._userService.getUserLoggedIn();
        this.token=this._userService.getToken();
        this.video=new Video(null, this.userLoggedIn.id, '', '', '');
    }

    /**
     * Función que añade un vídeo
     */
    addVideo(){
        if (this.form.valid) {
            this.setVideoFormValues();
            this._videoService.addFav(this.token, this.video).subscribe(
                response=>{
                    if (response) {             
                        this.form.reset();
                        this._router.navigate(['/video-list']);
                    }else{
                        this.showFlashMessage('No puedes añadir un vídeo que ya existe',
                            'alert alert-danger col-md-5 mt-3 mx-auto', 1500);
                    }                    
                },
                error=>{
                    this.showFlashMessage('No puedes añadir un vídeo que ya existe',
                        'alert alert-danger col-md-5 mt-3 mx-auto', 1500);
                    this.form.reset();
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
