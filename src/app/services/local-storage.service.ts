import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Article } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  news: Article[] = [];
  constructor( private storage: Storage, private toast: ToastController) {
    this.loadFavorites();
  }

  async loadFavorites(){
    this.news = await this.storage.get('favorites') || [];
    return this.news ;
  }

  async savefavorite( noticia:Article){
    
    const exist = this.news?.findIndex((not) => not.title === noticia.title);
    
    if(exist === -1){
      this.news.unshift(noticia);
    }else{
      this.news.splice(exist,1);
    }
    this.updateFavorites();
  }

  async updateFavorites(){
    await this.storage.set("favorites", this.news).then(()=> console.log('guardado'));
  }

}
