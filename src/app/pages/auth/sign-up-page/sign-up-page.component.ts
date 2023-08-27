import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-sign-up-page',
    templateUrl: './sign-up-page.component.html',
    styleUrls: ['./sign-up-page.component.scss']
})
export class SignUpPageComponent implements OnInit {
    redirect?: string;

    email: string = "";
    password: string = "";

    signUpForm = this.formBuilder.group({
        email: ["", Validators.required],
        password: ["", Validators.required]
    });

    loading = false;
    error: { conflict?: boolean, unholy?: boolean } = { }

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

    signUp() {
        if (this.signUpForm.invalid) {
            return;
        }

        this.error = { };
        this.loading = true;
        this.authService.signUp(this.email, this.password).subscribe(() => {
            this.loading = false;
            this.toastr.success("You have successfully created the account!");
            this.ngZone.run(() => {
                this.router.navigate([this.redirect ?? "/"]);
            });
        }, (err) => {
            this.loading = false;
            if (err.status === 409) {
                this.error = {
                    conflict: true
                }
                return;
            } else {
                this.error = {
                    unholy: true
                }
            }
        });
    }
}
