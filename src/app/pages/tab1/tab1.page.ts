import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/interfaces/interfaces';
import { NoticiasService } from 'src/app/services/noticias.service';
import { delay } from "rxjs/operators";


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  noticias: Article[] = []

  constructor( private noticiasService: NoticiasService) {
  }

  ngOnInit(): void {
    this.getNews();
  }

  loadData(event){
    this.getNews(event);
  }


  getNews(event?){
    this.noticiasService.getTopHeadlines().pipe(delay(1000)).subscribe((resp) => {
      console.log(resp);
      this.noticias.push(...resp.articles);

      if (resp.articles.length === 0) {
        event.target.disabled = true;
        return;
      }

      if(event){
        event.target.complete();
      }
    });
  }

}
