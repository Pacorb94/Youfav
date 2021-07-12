/**
 * Clase que almacena el vídeo
 */
export class Video {
    private id:any;
    private userId:number;
    private title:string;
    private description:string;
    private url:string;
    private createdAt:Date;
    private updatedAt:Date;

    constructor(id:any, userId:number, url:string, title:string, description:string) {
        this.id=id;
        this.userId=userId;
        this.title=title;
        this.description=description;
        this.url=url;  
        this.createdAt=new Date();
        this.updatedAt=new Date();
    }

    setId(id:any){
        this.id=id;
    }

    getId():any{
        return this.id;
    }

    setUserId(userId:number){
        this.userId=userId;
    }
    
    setTitle(title:string){
        this.title=title;
    }

    setDescription(description:string){
        this.description=description;
    }

    setUrl(url:string){
        this.url=url;
    }

    setValues(id:number, title:string, description:string, url:string){
        this.setId(id);
        this.setTitle(title);
        this.setDescription(description);
        this.setUrl(url);
    }
}