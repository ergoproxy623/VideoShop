import {Component, OnInit} from '@angular/core';
import {AuthService} from './services/auth.service'
import {Router} from '@angular/router';
import {AuthService as AuthServiceFB} from 'angularx-social-login';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import {TranslateService} from '@ngx-translate/core';
import 'hammerjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    user: {};


    constructor(
        private authService: AuthService,
        private router: Router,
        private authServiceFB: AuthServiceFB,
        private http: HttpClient,
        private toastr: ToastrService,
        private translate: TranslateService) {
        translate.setDefaultLang('ru');
    }


  ngOnInit() {
    this.authService.checkToken();
    this.authService.userUpdated
      .subscribe(
        eventData => this.user = this.authService.getUser()
      )
    // this.authService.userActions
    //   .subscribe(
    //     (type) => {
    //       switch(type) {
    //         case 'login':
    //           this.user = this.authService.getUser()
    //           break;
              
    //         case 'enter':
    //           this.authService.checkToken()
    //           break;
    //      }
    //     },
    //     (err) => {
    //       console.log(err)
    //     }
    //   )
    //   this.authService.userUpdated
    //     .subscribe(
    //       () => {
    //         this.user = this.authService.getUser()
    //       }
    //     )
    //   if (this.authService.getToken()) {
    //     this.authService.userActions.emit('user-enter')
    //   }
    }
      






}
