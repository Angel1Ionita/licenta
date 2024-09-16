import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../../service/article.service';
import { Article } from '../../dto/article';

@Component({
    selector: 'app-article',
    standalone: true,
    imports: [],
    templateUrl: './article.component.html',
    styleUrl: './article.component.css'
})
export class ArticleComponent implements OnInit {
    
    article!: Article;

    constructor(
        private route: ActivatedRoute,
        private articleService: ArticleService
    ) { }


    ngOnInit(): void {
        const id: string = this.route.snapshot.paramMap.get('id')!;
        this.article = this.articleService.articles[+id - 1];
    }

}
