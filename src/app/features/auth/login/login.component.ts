
import { DOCUMENT } from "@angular/common";
import { Component, Inject, Input, NgZone, OnInit, Renderer2 } from "@angular/core";
import { Router } from "@angular/router";
import { CredentialResponse } from "google-one-tap";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "src/app/services/auth.service";
import { environment } from "src/environments/environment";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
    @Input() redirectUrl: string | string[] | undefined;

    loading = false;

    constructor(private router: Router,
        private ngZone: NgZone,
        private renderer2: Renderer2,
        @Inject(DOCUMENT) private _document: Document,
        private authService: AuthService,
        private toastr: ToastrService) { }

    ngOnInit() {
        console.log(`${environment.apiUrl}/Auth/LogInWithGoogleRedirect`)
        this.initGoogleOneTap();
    }

    ngAfterViewInit() {
        const script1 = this.renderer2.createElement("script");
        script1.src = "https://accounts.google.com/gsi/client";
        script1.async = "true";
        script1.defer = "true";
        this.renderer2.appendChild(this._document.body, script1);
    }

    initGoogleOneTap() {
        // @ts-ignore
        window.onGoogleLibraryLoad = () => {
            // @ts-ignore
            google.accounts.id.initialize({
                client_id: environment.googleOAuthClientId,
                callback: this.handleCredentialResponse.bind(this),
                auto_select: false,
                cancel_on_tap_outside: true,
                //ux_mode: "redirect",
                //login_uri: `${environment.apiUrl}/Auth/LogInWithGoogleRedirect`,
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
        this.ngZone.run(() => {
            this.loading = true;
        });
        
        await this.authService.loginWithGoogle(response.credential).subscribe(
            () => {
                this.ngZone.run(() => {

                    if (this.redirectUrl) {
                        this.router.navigate(this.redirectUrl as any[]);

                    } else {
                        this.router.navigate(["/"]);
                    }
                })
            },
            (error: any) => {
                this.toastr.error("Please refresh the page and try again. Contact us if the issue persists.", "Login failed");
                this.ngZone.run(() => {
                    this.loading = false;
                });
                console.error(error);
            }
        );
    }
}
