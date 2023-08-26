import { Component, OnInit } from "@angular/core";
import { GalleryItem, ImageItem } from "ng-gallery";

@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
    images: GalleryItem[] = [];

    ngOnInit(): void {
        const imageUrls = [
            "DJI_0218", "DJI_0221", "DJI_0222", "DJI_0231", "DJI_0239",
            "DJI_0246", "DJI_0250", "DJI_0251", "DJI_0252", "DJI_0255",
            "DJI_0258", "DJI_0273"
        ].map(x => `assets\\images\\davin-phelps\\${x}.jpg`);
        this.images = imageUrls.map(x => new ImageItem({ src: x, thumb: x }));
    }
}
