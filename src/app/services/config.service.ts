import { Injectable } from "@angular/core";
import * as CONFIG from "../../appsettings.json";

@Injectable({
    providedIn: "root"
})
export class ConfigService {
    getConfig() {
        return CONFIG;
    }
}