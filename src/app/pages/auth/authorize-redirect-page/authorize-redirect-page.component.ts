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
        const href = window.location.href;        
        var token = href.substring(href.indexOf("?") + 1);
        if (token.endsWith("=")) {
            token = token.substring(0, token.length - 1);
        }
        this.authService.authorizeFromRedirect(token);
        this.router.navigate(["/"]);
    }
}
