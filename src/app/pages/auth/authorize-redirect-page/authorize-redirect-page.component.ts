import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "src/app/services/auth.service";

@Component({
    selector: "app-authorize-redirect-page",
    templateUrl: "./authorize-redirect-page.component.html",
    styleUrls: ["./authorize-redirect-page.component.scss"]
})
export class AuthorizeRedirectPageComponent implements OnInit {

    constructor(private route: ActivatedRoute, private authService: AuthService, private router: Router, private toastr: ToastrService) { }

    ngOnInit(): void {
        try {
            const href = window.location.href;
            let token = href.substring(href.indexOf("?") + 1);
            if (token.endsWith("=")) {
                token = token.substring(0, token.length - 1);
            }
            this.authService.authorizeFromRedirect(token);
        } catch (error) {
            this.toastr.error("Error while authorizing. Please try again later.");
        }
        this.router.navigate(["/"]);
    }
}
