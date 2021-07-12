/**
 * Clase que almacena al usuario
 */
export class User{
    private id: any;
    private name: string;
    private surname: string;
    private email: string;
    private password: any;
    private role: string;
    private createdAt: Date;  
    private updatedAt: Date;
    private getToken: any;
   
    constructor(id:any, name:string, surname:string, email:string, password:string){
        this.id=id;
        this.name=name;
        this.surname=surname;
        this.email=email;
        this.password=password;
        this.role='User';
        this.createdAt=new Date();
        this.updatedAt=new Date();
        this.getToken=null;
    }

    getId():any{
        return this.id;
    }

    setId(id:any):any{
        this.id=id;
    }

    getName(): string {
        return this.name;
    }

    setName(value: string) {
        this.name = value;
    }

    getSurname(): string {
        return this.surname;
    }

    setSurname(value: string) {
        this.surname = value;
    }

    getEmail(): string {
        return this.email;
    }

    setEmail(value: string) {
        this.email = value;
    }

    getPassword(): string {
        return this.password;
    }
    
    setPassword(value: string) {
        this.password = value;
    }

    getRole(): string {
        return this.role;
    }

    getCreatedAt(): Date {
        return this.createdAt;
    }

    getUpdatedAt(): Date {
        return this.updatedAt;
    }
        
    setGetToken(value: any) {
        this.getToken = value;
    }
}