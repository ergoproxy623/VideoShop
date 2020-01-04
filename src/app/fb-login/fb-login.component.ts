import {Component} from '@angular/core';

import {AuthService as AuthServiceFB} from 'angularx-social-login';
import {SocialUser} from 'angularx-social-login';
import {FacebookLoginProvider} from 'angularx-social-login';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from "../services/auth.service";
import {ToastrService} from 'ngx-toastr';
import {TranslateService} from "@ngx-translate/core";
import {Router} from '@angular/router';

@Component({
    selector: 'fb-login',
    templateUrl: './fb-login.component.html',
    styleUrls: ['./fb-login.component.css']
})
export class FbLoginComponent {

    user: SocialUser;

    constructor(private authServiceFB: AuthServiceFB, private http: HttpClient, private authService: AuthService, private router: Router, private toastr: ToastrService, private translate: TranslateService) {
    }

    // httpOptions = {
    //     headers: new HttpHeaders({
    //         'Content-Type': 'application/json'
    //     })
    // };


    signInWithFB(): void {
        this.authServiceFB.authState.subscribe((user) => {
            this.user = user;
            if (this.user) {
                // console.log(this.user);
                let data = {
                    "name": this.user.firstName,
                    "last_name": this.user.lastName,
                    "email": this.user.email,
                    "avatar_url": this.user.photoUrl,
                    "social_id": this.user.id
                };
                this.http.post('https://furniture.grassbusinesslabs.ml/api/socialLogin', data)
                    .subscribe((response: any) => {
                        // console.log(response);
                        if (!response.data.telephone) {
                            this.authService.telephoneMissing = true;
                        }

                        this.authService.setUser(response.data, response.token);
                        this.authService.userActions.emit('login');

                        let message = this.translate.instant("toastr.logIn");
                        this.toastr.success(message);
                        this.router.navigate(["/"]);
                    });
            }
        });

        this.authServiceFB.signIn(FacebookLoginProvider.PROVIDER_ID);
    }

    signOut(): void {
        this.authServiceFB.signOut();
    }

}