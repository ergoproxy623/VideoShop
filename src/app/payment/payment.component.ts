import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {HttpService} from '../services/http.service';

@Component({
    selector: 'app-payment',
    templateUrl: './payment.component.html',
    styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

    buttonEasy: any;
    buttonHard: any;
    success = true;

    constructor(private authService: AuthService,
                private router: Router,
                private httpSvc: HttpService,
    ) {
    }


    payment() {
        console.log(this.authService.getUser());
        if (this.authService.getUser()) {
            console.log("user logged in");
        } else {
            this.router.navigate(["/login"]);
            console.log("no user");
        }

    }

    getEasyButton() {
        this.httpSvc.getPayButtonEasy().subscribe(
            (res: any) => {
                // console.log(res);
                this.buttonEasy = res.html;
                this.success = res.success;
            },
            (err: any) => {
                this.success = err.success;
                // console.log(err);
            }
        );
        // console.log(this.httpSvc.getPayButtonEasy());
    }

    getHardButton() {
        this.httpSvc.getPayButtonHard().subscribe(
            (res: any) => {
                // console.log(res);
                this.buttonHard = res.html;
            },
            (err: any) => {
                // console.log(err);
            }
        );
        // console.log(this.httpSvc.getPayButtonHard());
    }

    ngOnInit() {
        this.getEasyButton();
        this.getHardButton();
    }

}
