import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {server, telephonePattern} from "../url.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {TranslateService} from "@ngx-translate/core";

@Component({
    selector: 'app-feedback',
    templateUrl: './feedback.component.html',
    styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {

    constructor(private http: HttpClient, private toastr: ToastrService, private translate: TranslateService) {}

    // httpOptions = {
    //     headers: new HttpHeaders({
    //         'Content-Type': 'application/json'
    //     })
    // };

    feedback = new FormGroup({
        name: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
        phone: new FormControl('', [Validators.pattern(telephonePattern)]),
        message: new FormControl('', Validators.required),
    });


    onSubmit() {
        // console.log(this.feedback.value);

        let data = {
            "name": this.feedback.value.name,
            "email": this.feedback.value.email,
            "phone": this.feedback.value.phone,
            "text": this.feedback.value.message
        };

        this.feedback.reset();
        this.feedback.controls.name.setErrors(null);
        this.feedback.controls.email.setErrors(null);
        this.feedback.controls.phone.setErrors(null);
        this.feedback.controls.message.setErrors(null);
        this.feedback.updateValueAndValidity();


        this.http.post(`${server}/feedback`, data)
            .subscribe(res => {
                if (res['success'] === true) {

                    let message = this.translate.instant("toastr.messageSent");
                    this.toastr.info(message);

                    // console.log('Message has been sent!');
                }
            })
    }


    ngOnInit() {
    }

}
