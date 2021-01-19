import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RespuestaTopHeadlines } from '../interfaces/interfaces';

@Injectable({
  providedIn: "root",
})
export class NoticiasService {
  private KEY = environment.apiKey;
  private URL = environment.apiUrl;
  headlinesPage = 0;
  categoryPage = 0;
  public currentCategory: string = "";
  constructor(private http: HttpClient) {}

  headers: HttpHeaders = new HttpHeaders({
    "x-Api-key": this.KEY,
  });

  query<T>(query: string) {
    //this.http2.setHeader("*", "x-Api-key",this.KEY);
    return this.http.get(this.URL + query , {headers: this.headers});
  }

  getTopHeadlines() {
    this.headlinesPage++;
    return this.query<RespuestaTopHeadlines>(
      `/top-headlines?country=co&page=${this.headlinesPage}`
    );
  }

  getTopHeadLinesCategory(category: string) {
    if (this.currentCategory === category) {
      this.categoryPage++;
    } else {
      this.currentCategory = category;
      this.categoryPage = 1;
    }

    return this.query<RespuestaTopHeadlines>(
      `/top-headlines?country=co&category=${category}&page=${this.categoryPage}`
    );
  }
}
