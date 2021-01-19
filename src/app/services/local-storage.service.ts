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
    this.news = await this.storage.get('favorites');
    return this.news;
  }

  async savefavorite( noticia:Article){

    const exist = this.news.find((not) => not.title === noticia.title);
    console.log(exist);
    if(!exist){
      this.news.unshift(noticia);
      await this.storage.set("favorites", this.news);
      const toast = await this.toast.create({
        message: 'Saved',
        position: 'top'
      });
      toast.present();


    }
  }

}
