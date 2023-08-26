import { Component, NgZone } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-sign-up-page',
    templateUrl: './sign-up-page.component.html',
    styleUrls: ['./sign-up-page.component.scss']
})
export class SignUpPageComponent {
    redirectUrl: string | string[] | undefined;

    email: string = "";
    password: string = "";

    signUpForm = this.formBuilder.group({
        email: ["", Validators.required],
        password: ["", Validators.required]
    });

    loading = false;

    constructor(private router: Router,
        private ngZone: NgZone,
        private authService: AuthService,
        private toastr: ToastrService,
        private formBuilder: FormBuilder) { }

    signUp() {
        if (this.signUpForm.invalid) {
            return;
        }

        this.loading = true;
        this.authService.signUp(this.email, this.password).subscribe(() => {
            this.loading = false;
            this.toastr.success("You have successfully created the account!");
            this.ngZone.run(() => {
                this.router.navigate([this.redirectUrl ?? "/"]);
            });
        }, () => {
            this.loading = false;
            this.toastr.error("Something unholy happened!");
        });
    }
}
