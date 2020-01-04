import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpService} from "../services/http.service";
import {AuthService} from '../services/auth.service';
import {User} from '../shared/user.interface';
import {HttpClient} from "@angular/common/http";
import {AsyncValidator} from "../shared/async.validator";
import {telephonePattern, namePattern, passwordPattern, server} from "../url.service";


@Component({
    selector: 'app-user-page',
    templateUrl: './user-page.component.html',
    styleUrls: ['./user-page.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class UserPageComponent implements OnInit {

    user: User;
    uploadForm: FormGroup;
    files;
    wrongFormat = true;

    firstName = new FormControl('', [Validators.required, Validators.pattern(namePattern)]);
    secondName = new FormControl('', [Validators.required, Validators.pattern(namePattern)]);
    phone = new FormControl('', [Validators.required, Validators.pattern(telephonePattern)], this.asyncValid.registerEmailPhoneValidator());
    password = new FormControl('', Validators.required);


    constructor(
        public http: HttpService,
        private authService: AuthService,
        private formBuilder: FormBuilder,
        private httpClient: HttpClient,
        private asyncValid: AsyncValidator) {
    }


    onFileSelect(event) {
        let target = event.target || event.srcElement;
        this.files = target.files;
        let type;
        if (this.files) {
            type = this.files[0].type;
            if (type === "image/png" || type === "image/jpg" || type === "image/bmp" || type === "image/jpeg") {
                console.log("Correct format");
                this.wrongFormat = false;
            } else {
                this.wrongFormat = true;
            }
        }
    }

    onSubmit() {

        let formData = new FormData();

        console.log(this.files);
        if (this.files) {

            formData.append('avatar_url', this.files[0]);

            this.httpClient.post(`${server}/update/user`, formData)
                .subscribe(
                    (res) => {
                        console.log(res);
                        this.authService.setUser(res['data'], this.authService.getToken())
                    },
                    (err) => console.log(err)
                );
        }
    }

    ngOnInit() {

        this.http.getPurchasedVideo1();
        this.http.getPurchasedVideo2();

        this.user = this.authService.getUser();
        this.authService.userUpdated
            .subscribe(
                () => {
                    this.user = this.authService.getUser()
                }
            );

        this.uploadForm = this.formBuilder.group({
            profile: ['']
        });

    }


}
