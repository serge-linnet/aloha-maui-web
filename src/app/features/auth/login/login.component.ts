
import { Component, Input, NgZone, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CredentialResponse } from "google-one-tap";
import { AuthService } from "src/app/services/auth.service";
import { ConfigService } from "src/app/services/config.service";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
    @Input() redirectUrl: string | string[] | undefined;

    constructor(private router: Router,
        private authService: AuthService,
        private ngZone: NgZone,
        private configService: ConfigService) { }


    ngOnInit() {
        this.initGoogleOneTap();
    }

    initGoogleOneTap() {
        const config = this.configService.getConfig();
        // @ts-ignore
        window.onGoogleLibraryLoad = () => {
            // @ts-ignore
            google.accounts.id.initialize({
                client_id: config.googleOAuthClientId,
                callback: this.handleCredentialResponse.bind(this),
                auto_select: false,
                cancel_on_tap_outside: true
            });
            // @ts-ignore
            google.accounts.id.renderButton(
                // @ts-ignore
                document.getElementById("googleSignInButton"),
                { theme: "outline", size: "large" }
            );
            // @ts-ignore
            google.accounts.id.prompt((notification: PromptMomentNotification) => { });
        };
    }

    async handleCredentialResponse(response: CredentialResponse) {
        console.log("handleCredentialResponse");
        await this.authService.loginWithGoogle(response.credential).subscribe(
            () => {
                this.ngZone.run(() => {
                    if (this.redirectUrl) { 
                        this.router.navigate(this.redirectUrl as any[]);
                        
                    } else {
                        this.router.navigate(['/']);
                    }
                })
            },
            (error: any) => {
                console.log(error);
            }
        );
    }

}



