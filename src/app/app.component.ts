import { Component } from '@angular/core';
import { UserService } from 'src/app/services/User.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers:[UserService]
})
export class AppComponent{}
