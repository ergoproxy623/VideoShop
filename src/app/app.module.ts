// Angular Modules
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClient} from '@angular/common/http';
import {MatIconModule} from '@angular/material/icon';

// Auth modules imports and services
import {SocialLoginModule, AuthServiceConfig} from "angularx-social-login";
import {FacebookLoginProvider} from "angularx-social-login";
import {HttpService} from './services/http.service';
import {AuthService} from './services/auth.service'
// import {SignUpForm} from './services/signup.form.service'
import {TokenInterceptorService} from './token-interceptor.service';
import {UserPageGuard} from './services/userPage-guard.service';
// import {VideoService} from './services/videos.service';
import {LoginGuard} from './services/login-guard.service';
import {SignupGuard} from "./services/signup-guard.service";
import {PassChangeGuard} from "./services/passChange-guard";
import {ClickOutsideModule} from 'ng-click-outside';
import {SlideshowModule} from 'ng-simple-slideshow';


// Components
import {AppRouting} from './app.routing.module';
import {HomeComponent} from './home/home.component'
import {HeaderComponent} from './header/header.component';
import {UserPageComponent} from './user-page/user-page.component';
import {LoginComponent} from './login/login.component';
import {FbLoginComponent} from './fb-login/fb-login.component';
import {PasswordRecoveryComponent} from './password-recovery/password-recovery.component';
import {PasswordChangeComponent} from './password-change/password-change.component';
import {AppComponent} from './app.component';
import {RegistrationFormComponent} from './registration-form/registration-form.component';
import {LoadingBarRouterModule} from '@ngx-loading-bar/router';
import {LoadingBarHttpClientModule} from '@ngx-loading-bar/http-client';
import {MainPageComponent} from './main-page/main-page.component';
// import {VideoPreviewComponent} from './video-preview/video-preview.component';
// import {VideoLogoComponent} from './video-preview/video-logo/video-logo.component';
import {VideoComponent} from "./video/video.component";

// NPM Packages
import {ToastrModule} from 'ngx-toastr';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {DemoMaterialModule} from './shared/material-module';
import 'hammerjs';
import {FeedbackComponent} from './feedback/feedback.component';
import {PaymentComponent} from './payment/payment.component';
import {NguCarouselModule} from '@ngu/carousel';
import {GalleryComponent} from './gallery/gallery.component';
import {OurProjectsComponent} from './our-projects/our-projects.component';
import {ContactsComponent} from './contacts/contacts.component';
import {HtmlSanitazePipe} from './shared/html-sanitaze.pipe';
import { BookComponent } from './book/book.component';


// Configurations for Facebook
let config = new AuthServiceConfig([
    {
        id: FacebookLoginProvider.PROVIDER_ID,
        provider: new FacebookLoginProvider("907953726216700")
    }
]);

export function provideConfig() {
    return config;
}

// Translation Loader export
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

// Main app module decorator
@NgModule({
    declarations: [
        AppComponent,
        RegistrationFormComponent,
        HomeComponent,
        UserPageComponent,
        HeaderComponent,
        LoginComponent,
        FbLoginComponent,
        PasswordRecoveryComponent,
        PasswordChangeComponent,
        HeaderComponent,
        MainPageComponent,
        FeedbackComponent,
        PaymentComponent,
        VideoComponent,
        GalleryComponent,
        OurProjectsComponent,
        ContactsComponent,
        HtmlSanitazePipe,
        BookComponent
    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        AppRouting,
        SocialLoginModule,
        BrowserModule,
        LoadingBarRouterModule,
        LoadingBarHttpClientModule,
        SocialLoginModule,
        CommonModule,
        BrowserAnimationsModule,
        DemoMaterialModule,
        MatIconModule,
        ToastrModule.forRoot({
            positionClass: 'toast-bottom-right',
            preventDuplicates: true
        }),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        NguCarouselModule,
        ClickOutsideModule,
        SlideshowModule
    ],
    providers: [
        AuthService,
        LoginGuard,
        // SignUpForm,
        UserPageGuard,
        SignupGuard,
        PassChangeGuard,
        HttpService,
        FbLoginComponent,
        // VideoService,
        {
            provide: AuthServiceConfig,
            useFactory: provideConfig
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptorService,
            multi: true
        }],
    bootstrap: [AppComponent]
})
export class AppModule {
}

