import {Component, HostListener, OnInit} from '@angular/core';
import {HttpService} from "../services/http.service";
import {disableBodyScroll, enableBodyScroll} from 'body-scroll-lock';

@Component({
    selector: 'app-gallery',
    templateUrl: './gallery.component.html',
    styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

    closeImage = false;

    @HostListener('document:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent): void {
        if (event.code === "Escape" && this.closeImage) {
            this.closePicture();
        }
    }

    imageSource;
    numberOfShownImg;

    onClickedOutside() {
        this.closePicture();
    }


    constructor(public http: HttpService) {
    }

    showPicture(item, i) {
        this.numberOfShownImg = i;
        this.imageSource = item.imgUrl;
        this.closeImage = true;
        disableBodyScroll();
    }

    openNextImg() {
        if (this.numberOfShownImg + 1 < this.http.gallery.length) {
            this.imageSource = this.http.gallery[this.numberOfShownImg + 1].imgUrl;
            this.numberOfShownImg++;
        }
    }

    openPreviousImg() {
        if (this.numberOfShownImg - 1 >=0 ) {
            this.imageSource = this.http.gallery[this.numberOfShownImg - 1].imgUrl;
            this.numberOfShownImg--;
        }
    }


    closePicture() {
        this.imageSource = null;
        this.closeImage = false;
        enableBodyScroll();
    }

    ngOnInit() {
        this.http.getPictures()
    }

}
