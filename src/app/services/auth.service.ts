import {Injectable, EventEmitter} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {User} from '../shared/user.interface';
import {ToastrService} from 'ngx-toastr';
import {TranslateService} from '@ngx-translate/core';
import {AuthService as AuthServiceFB} from 'angularx-social-login';
import {server} from "../url.service";

@Injectable({
    providedIn: 'root',
})
export class AuthService {


    telephoneMissing = false;


    constructor(
        private http: HttpClient,
        private router: Router,
        private toastr: ToastrService,
        private translate: TranslateService,
        private authServiceFB: AuthServiceFB) {
    }


    userActions = new EventEmitter<string>();
    userUpdated = new EventEmitter<any>();

    user: User;

// Send data about new-registered user to backend
    signUp(userData) {

        return this.http.post<any>(`${server}/register`, {
            name: userData.username,
            last_name: userData.surname,
            telephone: userData.telephone,
            email: userData.email,
            password: userData.password
        })
    }

// Return current data about user
    getUser() {
        if (this.user) {
            return this.user
        } else {
            return null
        }
    }

// Set current user for app
    setUser(userData, token) {
        // console.log("setting user");
        this.user = userData;
        this.userUpdated.emit();
        this.setToken(token);
    }

// Set Token to localStorage and redirecting user
    setToken(token) {

        this.userActions.emit('login');
        localStorage.setItem("token", token);
    }

// Returning token from localStorage
    getToken() {
        return localStorage.getItem("token")
    }

// Remove token from localStorage
    removeToken() {
        localStorage.removeItem("token")
    }

// Clear user data in app and removing token
    logout() {

        this.telephoneMissing = false;

        if (this.user.social_id) {
            this.authServiceFB.signOut();
        }

        this.user = null;
        this.userUpdated.emit();
        this.removeToken();

        let message = this.translate.instant("toastr.logOut");
        this.toastr.warning(message);
    }

// Check for token in localeStorage and updating a user if token is true
    checkToken() {
        if (this.getToken()) {
            this.http.get(`${server}/updatePage`)
                .subscribe(
                    (data: User) => {
                        this.user = data;
                        this.userUpdated.emit();
                    },
                    err => console.log(err)
                )
        }
    }

}