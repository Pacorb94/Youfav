import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/User.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';


@Component({
    selector: 'user-edit',
    templateUrl: './user-edit.component.html',
    styleUrls: ['./user-edit.component.scss'],
    providers:[UserService]
})
export class UserEditComponent implements OnInit{
    pageTitle:string;
    userLoggedIn:any;
    form:FormGroup;
    //Token del usuario
    token:string;
   
    constructor(private _userService:UserService, private _flashMessagesService:FlashMessagesService, 
    private _router:Router) {
        this.pageTitle='Modificar usuario';
        this.userLoggedIn=this._userService.getUserLoggedIn();
        this.form=new FormGroup({
            name:new FormControl(this.userLoggedIn.name, [Validators.pattern("^[a-zA-ZñáéíóúÑÁÉÍÓÚ ]*$")]),
            surname:new FormControl(this.userLoggedIn.surname, [Validators.pattern("^[a-zA-ZñáéíóúÑÁÉÍÓÚ ]*$")]),
            email:new FormControl(this.userLoggedIn.email, [Validators.required, Validators.email])
        });
        this.token=this._userService.getToken();
    }

    ngOnInit(){
        this.userLoggedIn=this._userService.getUserLoggedIn();
    }

    /**
     * Función que modifica el usuario
     */
    editUser(){
        if (this.form.valid) {
            this.setUserFormValues();
            this._userService.update(this.token, this.userLoggedIn).subscribe(
                response=>{
                    //Si tiene datos
                    if (response.data) {
                        this.userLoggedIn=response.data;
                        //Actualizamos el localStorage con los nuevos datos del usuario
                        localStorage.setItem('user', JSON.stringify(this.userLoggedIn));
                        this.showFlashMessage('Has modificado correctamente', 
                            'alert alert-success col-md-5 mt-3 mx-auto', 1500);
                    }else{
                        this.showFlashMessage('No has modificado correctamente', 
                            'alert alert-danger col-md-5 mt-3 mx-auto', 1500);
                    }
                },
                error=>{
                    this.showFlashMessage('No has modificado correctamente', 
                        'alert alert-danger col-md-5 mt-3 mx-auto', 1500);
                    this._router.navigate(['/']);
                }
            );
        }
    }

    /**
     * Función que da los valores del formulario al usuario
     */
    setUserFormValues(){
        if (this.form.get('name')?.value) {
            this.userLoggedIn.name=this.form.get('name')?.value;
        }
        if (this.form.get('surname')?.value) {
            this.userLoggedIn.surname=this.form.get('surname')?.value;
        }
        this.userLoggedIn.email=this.form.get('email')?.value;     
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
        if (field.errors?.pattern||field.errors?.email) {
            message=`El campo ${fieldName} es incorrecto`;        
        }else if(field.errors?.required){
            message=`El campo ${fieldName} debe estar relleno`;
        }
        return message;
    }
}
