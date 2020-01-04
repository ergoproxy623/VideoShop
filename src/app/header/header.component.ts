import {Component, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {AuthService} from '../services/auth.service';
import {User} from '../shared/user.interface';
import {Router} from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    user: User;

    constructor(
        private translate: TranslateService,
        private authService: AuthService,
        private router: Router) {
        translate.setDefaultLang('ru');
    }

    useLanguage(language: string) {
        this.translate.use(language);
    }

    ngOnInit() {
        this.authService.userUpdated
            .subscribe(
                (eventData) => {
                    this.user = this.authService.getUser();
                    // console.log('new user', this.user)
                }
            )
    }


    onSingOut() {
        this.authService.logout();
        this.router.navigate(['/']);
    }

}
