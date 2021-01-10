import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { IonSegment } from "@ionic/angular";
import { Article, RespuestaTopHeadlines } from 'src/app/interfaces/interfaces';
import { NoticiasService } from "src/app/services/noticias.service";


@Component({
  selector: "app-tab2",
  templateUrl: "tab2.page.html",
  styleUrls: ["tab2.page.scss"],
})
export class Tab2Page implements OnInit, AfterViewInit {
  @ViewChild("segment") segment: IonSegment;

  public categories: string[] = [
    "business",
    "entertainment",
    "general",
    "health",
    "science",
    "sports",
    "technology",
  ];
  noticias: Article[] = [];

  constructor(private NoticiasService: NoticiasService) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.segment.value = this.categories[0];
    this.getNews(this.segment.value);
  }

  getNews(category: string){
     this.NoticiasService.getTopHeadLinesCategory(category).subscribe(
       (news: RespuestaTopHeadlines) => {
         console.log(news);
         this.noticias.push(...news.articles);
       }
     );
  }

  categoryChange( event ){
    const category: string = event.detail.value
    this.noticias = [];
    this.getNews(category);
  }

}
