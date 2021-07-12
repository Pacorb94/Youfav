import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../../models/User';
import { UserService } from 'src/app/services/User.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
    selector: 'register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    //Para usar el servicio en el componente
    providers:[UserService]
})
export class RegisterComponent {
    pageTitle:string;
    form:FormGroup;
    user:User;
    goodRegister:boolean;

    //Le pasamos en el constructor el servicio
    constructor(private _userService:UserService, private _flashMessagesService:FlashMessagesService) {
        this.pageTitle='Registro';
        //Los campos del formulario deben estar agrupados si son más de uno
        this.form=new FormGroup({
            name:new FormControl('', [Validators.required, Validators.pattern("^[a-zA-ZñáéíóúÑÁÉÍÓÚ ]*$")]),
            surname:new FormControl('', [Validators.required, Validators.pattern("^[a-zA-ZñáéíóúÑÁÉÍÓÚ ]*$")]),
            email:new FormControl('', [Validators.required, Validators.email]),
            password:new FormControl('', Validators.required)
        });
        this.user=new User(null, '', '', '', '');
        this.goodRegister=false;
    }

    /**
     * Función que registra un usuario
     */
    register(){
        if (this.form.valid){
            this.setUserFormValues();
            this._userService.register(this.user).subscribe(
                response=>{
                    if (response) {
                       this.goodRegister=true;           
                    }else{
                        this.showFlashMessage('No te has registrado correctamente',
                            'alert alert-danger col-md-5 mt-3 mx-auto', 1500);
                    }           
                    //Para limpiar el formulario
                    this.form.reset();      
                },
                error=>{
                    this.showFlashMessage('No te has registrado correctamente',
                        'alert alert-danger col-md-5 mt-3 mx-auto', 1500);
                    this.form.reset();
                }
            );
        }      
    }

    
    /**
     * Función que da los valores del formulario al usuario
     */
    setUserFormValues(){
        //Con ? evitamos que Angular muestra un mensaje de que el campo puede estar null
        this.user.setName(this.form.get('name')?.value);
        this.user.setSurname(this.form.get('surname')?.value);
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
