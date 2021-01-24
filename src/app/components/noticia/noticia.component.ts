import { Component, OnInit, Input } from '@angular/core';
import { Article } from 'src/app/interfaces/interfaces';
import { InAppBrowser } from "@ionic-native/in-app-browser/ngx";
import { ActionSheetController, ToastController } from '@ionic/angular';
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
  @Input()enFavoritos = false;
  constructor(
    private iab: InAppBrowser,
    private actionSheetController: ActionSheetController,
    private sharing: SocialSharing,
    private storage: LocalStorageService,
    public toastController: ToastController
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
          text: `${this.enFavoritos ? 'Delete' : 'Save'} Favorite`,
          icon: "star",
          handler: () => {
           this.storage.savefavorite(this.new).then(()=> this.showToast(this.enFavoritos ? 'Deleted' : 'Saved'));
          }
        },
        {
          cssClass: "action-dark",
          text: "Cancel",
          icon: "close",
          //role: "cancel",
          handler: () => {

          },
        },
      ],
    });

    await actionSheet.present();
  }

  share(){
    this.sharing.share(this.new.title, this.new.source.name,'', this.new.url);
  }


  async showToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: `${mensaje} news`,
      position: 'top',
      duration: 2000
    });
    toast.present();
  }



}
