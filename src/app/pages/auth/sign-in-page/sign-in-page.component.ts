import { Component, Input, NgZone } from "@angular/core";
import { Validators, FormBuilder } from "@angular/forms";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "src/app/services/auth.service";

@Component({
    selector: "app-sign-in-page",
    templateUrl: "./sign-in-page.component.html",
    styleUrls: ["./sign-in-page.component.scss"]
})
export class SignInPageComponent {
    redirect?: string;

    email: string = "";
    password: string = "";

    loginForm = this.formBuilder.group({
        email: ["", Validators.required],
        password: ["", Validators.required]
    });

    loading = false;
    error: { invalid?: boolean, unholy?: boolean } = {}

    constructor(private router: Router,
        private route: ActivatedRoute,
        private ngZone: NgZone,
        private authService: AuthService,
        private toastr: ToastrService,
        private formBuilder: FormBuilder) { }

    ngOnInit() {
        this.route.queryParams.subscribe((params: Params) => {
            this.redirect = params["redirect"];
        });
    }

    login() {
        if (this.loginForm.invalid) {
            return;
        }

        this.error = {};
        this.loading = true;
        this.authService.signIn(this.email, this.password).subscribe(() => {
            this.loading = false;
            this.toastr.success("You have successfully logged in!");
            this.ngZone.run(() => {
                this.router.navigate([this.redirect ?? "/"]);
            });
        }, (err) => {
            this.loading = false;
            if (err.status === 401) {
                this.error = {
                    invalid: true
                }
            } else {
                this.error = {
                    unholy: true
                }
            }
        });
    }
}