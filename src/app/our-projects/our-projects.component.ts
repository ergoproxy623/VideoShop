import {Component, HostListener, OnInit, Renderer2, ViewChild} from '@angular/core';
import {disableBodyScroll, enableBodyScroll} from 'body-scroll-lock';

@Component({
    selector: 'app-our-projects',
    templateUrl: './our-projects.component.html',
    styleUrls: ['./our-projects.component.scss']
})
export class OurProjectsComponent implements OnInit {

    constructor() {
    }

    showVideo;
    videoUrl;

    @HostListener('document:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent): void {
        if (event.code === "Escape" && this.showVideo) {
            this.closeVideo();
        }
    }


    @ViewChild("videoFrame1") frame;

    closeVideo() {
        // console.log('outside');
        enableBodyScroll();
        this.showVideo = false;
    }


    startVideo() {
        disableBodyScroll();
        document.body.classList.add("home");

        this.showVideo = true;

        // this.videoUrl = "https://www.youtube.com/watch?v=dlJew-Dw87I";
        //
        // this.renderer.setAttribute(this.frame.nativeElement, "src", this.videoUrl);


    }

    ngOnInit() {
    }

}
