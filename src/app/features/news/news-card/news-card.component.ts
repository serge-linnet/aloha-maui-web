import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-news-card',
    templateUrl: './news-card.component.html',
    styleUrls: ['./news-card.component.scss']
})
export class NewsCardComponent {
    @Input() description?: string;
    @Input() title!: string;
    @Input() imageUrl!: string;
    @Input() link!: string;
}
