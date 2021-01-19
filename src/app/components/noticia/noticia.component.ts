import { Component, OnInit, Input } from '@angular/core';
import { Article } from 'src/app/interfaces/interfaces';
import { InAppBrowser } from "@ionic-native/in-app-browser/ngx";
import { ActionSheetController } from '@ionic/angular';
import { SocialSharing } from "@ionic-native/social-sharing/ngx";
import { LocalStorageService } from 'src/app/services/local-storage.service';


@Component({
  selector: "app-noticia",
  templateUrl: "./noticia.component.html",
  styleUrls: ["./noticia.component.scss"],
})
export class NoticiaComponent implements OnInit {
  @Input() new: Article;
  @Input() position: number;

  constructor(
    private iab: InAppBrowser,
    private actionSheetController: ActionSheetController,
    private sharing: SocialSharing,
    private storage: LocalStorageService
  ) {}

  ngOnInit() {}

  openUrl() {
    const browser = this.iab.create(this.new.url, "_self");
  }

  async openMenu(){
    const actionSheet = await this.actionSheetController.create({
      cssClass: "my-custom-class",
      buttons: [
        {
          cssClass: "action-dark",
          text: "Share",
          icon: "share-social-outline",
          handler: () => {
            this.share();
          },
        },
        {
          cssClass: "action-dark",
          text: "Save on Favorite",
          icon: "star",
          handler: () => {
           this.storage.savefavorite(this.new);
          },
        },
        {
          cssClass: "action-dark",
          text: "Cancel",
          icon: "close",
          //role: "cancel",
          handler: () => {
            console.log("Cancel clicked");
          },
        },
      ],
    });

    await actionSheet.present();
  }

  share(){
    this.sharing.share(this.new.title, this.new.source.name,'', this.new.url);
  }

}
