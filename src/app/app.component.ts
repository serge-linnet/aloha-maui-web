import { Component, OnInit } from "@angular/core";
import { Meta } from "@angular/platform-browser";
import { ActivatedRoute, UrlSegment } from "@angular/router";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
    constructor(private route: ActivatedRoute, private meta: Meta) {

    }

    async ngOnInit(): Promise<void> {
        this.meta.addTags([
            { name: "viewport", content: "width=device-width, initial-scale=1" },
            { name: "robots", content: "index, follow" },
            { name: "keywords", content: "Help Hawaii, Hawaii wildfire, charity events," +
            "   community support, fundraising, disaster relief, volunteer, donate, aid, wildfire recovery" },
            { name: "description", content: "Come together to join our community & group fundraising events " +
                "over the weekend Friday 8th to Sunday 10th September 2023, to provide direct support to the " +
                "Hawaiian island families & communities impacted by the Maui wildfires on 08 August 2023. " +
                "All funds raised will go directly to those impacted by the Maui wild fires to help them rebuild " +
                "their homes, their businesses, their jobs, their livelihoods, and their communities in partnership " +
                "with local Maui non-profit organisations and direct community-led relief efforts." }
        ]);
    }
}