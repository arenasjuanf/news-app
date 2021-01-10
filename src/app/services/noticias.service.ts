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

  constructor(private http: HttpClient) {}

  headers: HttpHeaders = new HttpHeaders({
    "x-Api-key": this.KEY
  });


  query<T>( query: string){
    return this.http.get<T>(this.URL + query, {
      headers: this.headers
    });
  }


  getTopHeadlines() {
    this.headlinesPage++;
    console.log( this.headlinesPage);
    return this.query<RespuestaTopHeadlines>(`/top-headlines?country=us&page=${this.headlinesPage}`);
  }

  getTopHeadLinesCategory(category: string) {
    this.headlinesPage++;
    return this.query<RespuestaTopHeadlines>(
      `/top-headlines?country=us&category=${category}&page=headlinesPage`
    );

  }
}
