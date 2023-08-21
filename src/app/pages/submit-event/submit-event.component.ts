import { Component } from "@angular/core";
import {
    BOLD_BUTTON, EditorConfig, ITALIC_BUTTON, ORDERED_LIST_BUTTON,
    SEPARATOR, SUBSCRIPT_BUTTON, SUPERSCRIPT_BUTTON,
    UNDERLINE_BUTTON, UNORDERED_LIST_BUTTON
} from "ngx-simple-text-editor";

@Component({
    selector: "app-submit-event",
    templateUrl: "./submit-event.component.html",
    styleUrls: ["./submit-event.component.less"]
})
export class SubmitEventComponent {
    content = "";
    config: EditorConfig = {
        placeholder: "Type something...",
        buttons: [BOLD_BUTTON, ITALIC_BUTTON, UNDERLINE_BUTTON, SEPARATOR,
            ORDERED_LIST_BUTTON, UNORDERED_LIST_BUTTON, SEPARATOR,
            SUBSCRIPT_BUTTON, SUPERSCRIPT_BUTTON],
    };
}
