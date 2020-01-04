import {
    Component,
    Input,
    OnInit,
    ChangeDetectorRef,
    ChangeDetectionStrategy,
    ViewChild,
    Renderer2
} from '@angular/core';
import {NguCarouselConfig} from '@ngu/carousel';
import {slider} from './hello-slide.animation';
import {HttpService} from '../services/http.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
    selector: 'app-carousel',
    templateUrl: 'video.component.html',
    styleUrls: ['video.component.css'],
    animations: [slider]
})
export class VideoComponent implements OnInit {
    @Input() name: string;
    public carouselTileItems$;

    @ViewChild('videoFrame') frame;

    showVideo;
    videoUrl;
    showCarousel = false;

    constructor(private cdr: ChangeDetectorRef, public http: HttpService, public sanitizer: DomSanitizer, private renderer: Renderer2) {
    }

    public carouselTileConfig: NguCarouselConfig = {
        grid: {xs: 1, sm: 2, md: 3, lg: 4, all: 0},
        speed: 1000,
        point: {
            visible: true
        },
        touch: true,
        // loop: true,
        interval: {timing: 1500},
        animation: 'lazy'
    };
    tempData: any[];

    beginVideo( number ) {
        this.showVideo = true;
        this.videoUrl = this.http.video[ number ];
        // this.videoUrl = this.http.video[number]+"&origin=https://localhost:4200";
        // console.log(this.videoUrl);
        this.renderer.setAttribute(this.frame.nativeElement, 'src', this.videoUrl);
    }


    ngOnInit() {
        this.http.getVideos()
            .then(res => {
                    this.carouselTileItems$ = res;
                    this.showCarousel = true;
                    // this.cdr.markForCheck();
                    this.cdr.detectChanges();
                    this.renderer.setAttribute(this.frame.nativeElement, 'src', this.http.video[0]);
                }
            );

    }
}
