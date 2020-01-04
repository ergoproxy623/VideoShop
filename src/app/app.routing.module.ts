import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {RegistrationFormComponent} from './registration-form/registration-form.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from "./login/login.component";
import {UserPageComponent} from "./user-page/user-page.component";
import {PasswordRecoveryComponent} from "./password-recovery/password-recovery.component";
import {UserPageGuard} from './services/userPage-guard.service';
import {PasswordChangeComponent} from "./password-change/password-change.component";
import {LoginGuard} from './services/login-guard.service';
import {SignupGuard} from './services/signup-guard.service';
import {PassChangeGuard} from "./services/passChange-guard";


const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'passRecovery', component: PasswordRecoveryComponent},

    {path: 'login', canActivate: [LoginGuard], component: LoginComponent},
    {path: 'passChange', canActivate: [PassChangeGuard], component: PasswordChangeComponent},
    {path: 'signup', canActivate: [SignupGuard], component: RegistrationFormComponent},
    {path: 'user-page', canActivate: [UserPageGuard], component: UserPageComponent},
    {path: '**', pathMatch: 'full', component: HomeComponent}
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, {
            anchorScrolling: 'enabled'
        })
    ],
    exports: [
        RouterModule
    ]
})

export class AppRouting {

}
