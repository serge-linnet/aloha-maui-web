import { Component, NgZone, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { CredentialResponse } from "google-one-tap";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {

    constructor(private router: Router,
        private authService: AuthService,
        private ngZone: NgZone) { }

    private clientId = "993656706207-srhdeubn204t2scrdio4t2s7jbcg74co.apps.googleusercontent.com";

    ngOnInit() {
        this.initGoogleOneTap();
    }

    initGoogleOneTap() {
        // @ts-ignore
        window.onGoogleLibraryLoad = () => {
            // @ts-ignore
            google.accounts.id.initialize({
                client_id: this.clientId,
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
            (x: any) => {
                localStorage.setItem("token", x.token);
                this.ngZone.run(() => {
                    this.router.navigate(['/logout']);
                })
            },
            (error: any) => {
                console.log(error);
            }
        );
    }

}



