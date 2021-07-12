import { Component, ViewChild, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../../models/User';
import { UserService } from 'src/app/services/User.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    //Para usar el servicio en el componente
    providers:[UserService]
})
export class LoginComponent implements AfterViewInit{
    pageTitle:string;
    form:FormGroup;
    //Se usará para darle el email y contraseña
    user:User;
    userLoggedIn:any;
    //Token del usuario
    token:string;
    @ViewChild('check', { static: false }) checkbox: any;

    //Le pasamos en el constructor los servicios
    constructor(private _userService:UserService, private _flashMessagesService:FlashMessagesService, 
    private _router:Router, private _cdRef:ChangeDetectorRef) { 
        this.pageTitle='Iniciar sesión';
        this.form=new FormGroup({
            email:new FormControl('', [Validators.required, Validators.email]),
            password:new FormControl('', Validators.required)
        });
        this.user=new User(null, '', '', '', '');
        this.token='';
    }

    //Para que podamos seleccionar elementos HTML debemos esperar a que cargue la vista
    ngAfterViewInit(){
        this.fillEmailAndMarkCheckbox();       
    }

    /**
     * Función que rellena el campo email con el localStorage y marca el checkbox
     */
    fillEmailAndMarkCheckbox(){
        //Si existe
        if (localStorage.hasOwnProperty('rememberEmail')) {
            this.form.get('email')?.setValue(localStorage.getItem('rememberEmail'));
            this.checkbox.nativeElement.checked=true;
            this._cdRef.detectChanges();
        }
    }

    /**
     * Función que inicia sesión
     */
    login(){
        if (this.form.valid){
            this.setUserFormValues();
            this._userService.login(this.user).subscribe(
                response=>{
                    //Si existe el usuario
                    if (response.user) {        
                        this.userLoggedIn=response.user;
                        localStorage.setItem('user', JSON.stringify(this.userLoggedIn));
                        this.getToken(this.user);
                        this._router.navigate(['/']);
                    }else{
                        this.showFlashMessage(' No has iniciado sesión correctamente',
                            'alert alert-danger col-md-5 mt-3 mx-auto', 1500);
                    }                
                },
                error=>{
                    this.showFlashMessage(' No has iniciado sesión correctamente',
                        'alert alert-danger col-md-5 mt-3 mx-auto', 1500);
                    //Limpiamos el campo de la contraseña
                    this.form.get('password')?.setValue(this.form.get('password')?.value);
                }
            );
        }      
    }

    /**
     * Función que da los valores del formulario al usuario
     */
    setUserFormValues(){
        this.user.setEmail(this.form.get('email')?.value);
        this.user.setPassword(this.form.get('password')?.value);
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
     * Función que obtiene el token del usuario
     * @param userLoggedIn 
     */
    getToken(userLoggedIn:any){
        this._userService.login(userLoggedIn, true).subscribe(
            response=>{
                //Si tiene el token
                if (response.token) {
                    this.token=response.token;
                    localStorage.setItem('token', this.token);
                }
                //Para limpiar el formulario
                this.form.reset();       
            },
            error=>{
                this.form.reset();
            }
        );      
    }

    /**
     * Función que guarda el email si se marca el checkbox y sino se borra el
     * email del localstorage
     * @param event 
     */
    rememberEmail(event:any){
        if (event.target.checked&&this.form.get('email')?.value) {
            let email=this.form.get('email')?.value;
            localStorage.setItem('rememberEmail', email);         
        }else if(event.target.checked==false&&localStorage.hasOwnProperty('rememberEmail')){
            localStorage.removeItem('rememberEmail');
        }
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
        if (field.errors?.pattern||field.errors?.email) {
            message=`El campo ${fieldName} es incorrecto`;        
        }else if(field.errors?.required){
            message=`El campo ${fieldName} debe estar relleno`;
        }
        return message;
    }
}
