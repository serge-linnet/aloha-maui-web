import { Component } from "@angular/core";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.less"]
})
export class LoginComponent {
    email?: string
    password?: string

    login() {
        console.log(this.email, this.password)
    }
}
