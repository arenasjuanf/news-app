import { Component } from '@angular/core';
import { Article } from 'src/app/interfaces/interfaces';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  favorites: Article[] = [];

  constructor( private storage: LocalStorageService) {
    this.getFavorites();
  }

  async getFavorites(){
    this.favorites =  await this.storage.loadFavorites() || [];
    console.log(this.favorites);
  }

}
