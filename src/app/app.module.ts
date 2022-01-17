import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { routing, appRoutingProviders } from './app.routing';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ErrorComponent } from './components/error/error.component';
import { HttpClientModule } from '@angular/common/http';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { AddVideoComponent } from './components/add-video/add-video.component';
//Para que funcione el guard en todas las rutas hay que importarlo en todo el programa
import { CheckUserGuard } from './guards/CheckUser.guard';
import { UserLoggedInGuard } from './guards/UserLoggedIn.guard';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { UserService } from 'src/app/services/User.service';
import { VideoEditComponent } from './components/video-edit/video-edit.component';
import { WatchVideoComponent } from './components/watch-video/watch-video.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UserVideoListComponent } from './components/user-video-list/user-video-list.component';


@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        RegisterComponent,
        LoginComponent,
        ErrorComponent,
        UserEditComponent,
        AddVideoComponent,
        VideoEditComponent,
        WatchVideoComponent,
        NavbarComponent,
        UserVideoListComponent
    ],
    imports: [
        BrowserModule,
        //Como es un módulo se carga aquí
        routing,
        ReactiveFormsModule,
        HttpClientModule,
        FlashMessagesModule.forRoot()
    ],
    providers: [
        appRoutingProviders,
        CheckUserGuard,
        UserLoggedInGuard,
        UserService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
