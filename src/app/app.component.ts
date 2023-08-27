import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, UrlSegment } from "@angular/router";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
    hideAll = true;
    constructor(private route : ActivatedRoute) {

    }

    async ngOnInit(): Promise<void> {
        this.hideAll = window.location.pathname == "/" || window.location.pathname == "";
    }
}