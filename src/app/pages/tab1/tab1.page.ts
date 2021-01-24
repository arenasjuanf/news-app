import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/interfaces/interfaces';
import { NoticiasService } from 'src/app/services/noticias.service';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  loading = false;
  noticias: Article[] = []
  resp: import("src/app/interfaces/interfaces").RespuestaTopHeadlines;
  msg: any;

  constructor( private noticiasService: NoticiasService) {
  }

  ngOnInit(): void {
    this.getNews();
  }

  loadData(event){
    this.getNews(event);
  }


  getNews(event?){
    this.loading = true;
    this.noticiasService.getTopHeadlines().subscribe((resp:any) => {
      this.resp = resp;
      this.noticias.push(...resp.articles);
      this.loading = false;
      if (resp.articles.length === 0) {
        event.target.disabled = true;
        return;
      }

      if(event){
        event.target.complete();
      }
    }, (err) => this.msg = err);
  }

}
