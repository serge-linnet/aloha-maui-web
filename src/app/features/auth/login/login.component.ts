
import { DOCUMENT } from "@angular/common";
import { Component, Inject, Input, NgZone, OnInit, Renderer2 } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
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
export class LoginComponent {
    @Input() redirectUrl: string | string[] | undefined;

    email: string = "";
    password: string = "";

    loginForm = this.formBuilder.group({
        email: ["", Validators.required],
        password: ["", Validators.required]
    });

    loading = false;

    constructor(private router: Router,
        private ngZone: NgZone,
        private authService: AuthService,
        private toastr: ToastrService,
        private formBuilder: FormBuilder) { }

    login() {
        if (this.loginForm.invalid) {
            return;
        }
        
        this.loading = true;
        this.authService.signIn(this.email, this.password).subscribe(() => {
            this.loading = false;
            this.toastr.success("You have successfully logged in!");
            this.ngZone.run(() => {
                this.router.navigate([this.redirectUrl ?? "/"]);
            });
        }, () => {
            this.loading = false;
            this.toastr.error("Invalid credentials!");
        });
    }
}
