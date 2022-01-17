import { UserLoggedInGuard } from './guards/UserLoggedIn.guard';
//Importamos el servicio, los módulos de las rutas y los componentes
import { ModuleWithProviders, NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { AddVideoComponent } from './components/add-video/add-video.component';
import { ErrorComponent } from './components/error/error.component';
import { CheckUserGuard } from './guards/CheckUser.guard';
import { VideoEditComponent } from './components/video-edit/video-edit.component';
import { WatchVideoComponent } from './components/watch-video/watch-video.component';
import { UserVideoListComponent } from './components/user-video-list/user-video-list.component';

const routes:Routes=[
    //path es la ruta por donde se accede y luego se pone el componente que se cargará
    {path:'', component:HomeComponent},
    {path:'video-list', component:UserVideoListComponent, canActivate:[CheckUserGuard]},
    {path:'video-list/:page', component:UserVideoListComponent, canActivate:[CheckUserGuard]},
    {path:'register', component:RegisterComponent, canActivate:[UserLoggedInGuard]},
    {path:'login', component:LoginComponent, canActivate:[UserLoggedInGuard]},
    //Con la propiedad "canActivate" le añadimos el guard
    {path:'user-settings', component:UserEditComponent, canActivate:[CheckUserGuard]},
    {path:'add-video', component:AddVideoComponent, canActivate:[CheckUserGuard]},
    {path:'edit-video/:id', component:VideoEditComponent, canActivate:[CheckUserGuard]},
    {path:'watch-video/:id', component:WatchVideoComponent, canActivate:[CheckUserGuard]},
    {path:'error', component:ErrorComponent},
    //** para cuando no encuentre ninguna de las rutas anteriores
    {path:'**', component:ErrorComponent}
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            /*Cada vez que se pulse en un ancla nos llevará suavemente 
            hacia la parte superior de la pantalla*/
            scrollPositionRestoration: 'top'   
        })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
