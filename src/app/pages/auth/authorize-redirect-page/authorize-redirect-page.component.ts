import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-authorize-redirect-page',
    templateUrl: './authorize-redirect-page.component.html',
    styleUrls: ['./authorize-redirect-page.component.scss']
})
export class AuthorizeRedirectPageComponent implements OnInit {

    constructor(private route: ActivatedRoute, private authService: AuthService, private router: Router) { }
    ngOnInit(): void {
        this.route.params.subscribe((params: Params) => {
            const token = params["usr"];
            this.authService.authorizeFromRedirect(token);
            this.router.navigate(["/"]);
        });
    }
}
