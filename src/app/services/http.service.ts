import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';
import {Router} from "@angular/router";
import {ToastrService} from 'ngx-toastr';
import {server} from "../url.service"
import {TranslateService} from "@ngx-translate/core";

@Injectable()
export class HttpService {

    constructor(private http: HttpClient, private authService: AuthService, private router: Router, private toastr: ToastrService, private translate: TranslateService) {
    }


    wrongEmail = false;

    images = [];

    gallery = [];

    video = [];

    purchasedVideo1 = [];
    purchasedVideo2 = [];
    showVideo1 = false;
    showVideo2 = false;


    // token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvZnVybml0dXJlLmdyYXNzYnVzaW5lc3NsYWJzLm1sXC9hcGlcL2xvZ2luIiwiaWF0IjoxNTY1MTc5NTk3LCJleHAiOjE2MjUxNzk1MzcsIm5iZiI6MTU2NTE3OTU5NywianRpIjoicmFTZDRGdklNaWV1V1NTOSIsInN1YiI6MywicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.1G_DbFx1-j50bf15wwODUwC3c8g9u01pegfTo7b6WbY";
    // httpOptions = {
    //     headers: new HttpHeaders({
    //         'Content-Type': 'application/json',
    //         'Authorization': "Bearer " + this.token
    //     })
    // };


    changeUserDetails(item, toChange) {
        let data = {
            [toChange]: item.value
        };

        // let id = this.authService.user.id;

        this.http.post(`${server}/update/user`, data)
            .subscribe((response: any) => this.authService.setUser(response.data, this.authService.getToken()));
        item.reset();
    }


    getVideos() {
        // let answer;
        // let entry;
        return this.http.get(`${server}/preview`)
            .toPromise()
            .then((response) => {
                //console.log(response);
                this.images = [];
                this.video = [];
                // answer = response;
                response['youtube'].forEach(item => {
                        let entry = item['snippet']['resourceId']['videoId'];
                        this.images.push(`https://img.youtube.com/vi/${entry}/0.jpg`);
                        this.video.push(`https://www.youtube.com/embed/${entry}`);
                        // this.video.push(`https://www.youtube.com/embed/${entry}?autoplay=1&origin=https://localhost:4200`);
                    }
                )
                return this.images;
            });
    }


    getPurchasedVideo1() {
        this.purchasedVideo1 = [];
        return this.http.get(`${server}/showVideo1`)
            .subscribe(res => {
                if (res['success'] === true) {
                    res['data'].forEach(item => this.purchasedVideo1.push(item['video_url']));
                    this.showVideo1 = true;
                } else{
                    this.showVideo1 = false;
                }
            })
    }

    getPurchasedVideo2() {
        this.purchasedVideo2 = [];
        return this.http.get(`${server}/showVideo2`)
            .subscribe(res => {
                // console.log(res);
                if (res['success'] === true) {
                    res['data'].forEach(item => this.purchasedVideo2.push(item['video_url']));
                    this.showVideo2 = true;
                } else{
                    this.showVideo2 = false;
                }
            })
    }


    getPictures() {
        return this.http.get(`${server}/image`)
            .subscribe(res => {
                // console.log(res);
                if (res['success'] === true) {
                    this.gallery = [];
                    res['data'].forEach(item => {
                        let imgUrlName = {imgUrl: item.image_url, imgName: item.name};

                        this.gallery.push(imgUrlName);
                    })
                }
                return this.gallery;
            })
    }


    forgotPassword(item) {

        this.http.post(`${server}/password/reset`, item.value)
            .subscribe((response) => console.log(response));

        let message = this.translate.instant("toastr.passRecovery");
        this.toastr.info(message);

        this.router.navigate(['../login']);
    }


    changePassword(item) {
        if (item.value.newPass !== item.value.repeatPass) {

            let message = this.translate.instant("toastr.passNotMatch");
            this.toastr.success(message);

        } else {
            let data = {
                "password": item.value.oldPass,
                "new_password": item.value.newPass
            };


            this.http.post(`${server}/updatePassword`, data)
                .subscribe(response => {
                        // console.log(response);
                        if (response['success'] === true) {

                            let message = this.translate.instant("toastr.passChanged");
                            this.toastr.success(message);

                            this.router.navigate(['userPage']);
                        }
                    }, error => {
                        console.log(error);

                        let message = this.translate.instant("toastr.oldPassWrong");
                        this.toastr.success(message);
                    }
                )
        }
    }


    login(item) {
        let user = {
            "email": item.value.email,
            "password": item.value.password
        };


        this.http.post(`${server}/login`, user)
            .subscribe((response: any) => {
                // console.log(response);
                this.authService.setUser(response.data.user, response.data.token);

                let message = this.translate.instant("toastr.logIn");
                this.toastr.success(message);

                this.router.navigate(["/"]);
            }, (err) => {

                console.log(err);
                // if (err.error.error === "We can't find a user with that e-mail address.") {
                //     console.log("Wrong adress");
                //     this.wrongEmail = true;
                //     console.log(this.wrongEmail);
                // }
                if (err.error.error === "Incorrect password.") {

                    let message = this.translate.instant("toastr.wrongPass");
                    this.toastr.error(message);
                }
            });
        //item.reset();
    }

    getPayButtonEasy() {
        let payInfo = {
            "status": 1,
            'payment_system': 'LiqPay'
        };
        return this.http.post(
            `${server}/buying`,
            payInfo,
        );
    }

    getPayButtonHard() {
        let payInfo = {
            "status": 2,
            'payment_system': 'LiqPay'
        };
        return this.http.post(
            `${server}/buying`,
            payInfo,
        );
    }

    // postData() {
    //     this.http.post('https://furniture.grassbusinesslabs.ml//api/login', this.user)
    //         .subscribe((response) => {
    //             console.log(response)
    //             this.authService.setUser(response, response);
    //             // this.authService.user.name = response['data'].user.name;
    //             // this.oldSecondName = response['data'].user.last_name;
    //             // this.oldEmail = response['data'].user.email;
    //             // this.oldPhone = response['data'].user.telephone;
    //
    //             this.token = response['data'].token;
    //             this.httpOptions = {
    //                 headers: new HttpHeaders({
    //                     'Content-Type': 'application/json',
    //                     'Authorization': "Bearer " + this.token
    //                 })
    //             };
    //
    //         });
    // }


}
