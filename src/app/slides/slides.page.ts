import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {AlertController, MenuController, NavController, IonSlides } from '@ionic/angular';
import {Storage} from '@ionic/storage';

@Component({
  selector: 'app-slides',
  templateUrl: './slides.page.html',
  styleUrls: ['./slides.page.scss'],
})
export class SlidesPage implements OnInit {
  constructor(private router: Router,
              private menuCtrl: MenuController,
              private alertController: AlertController,
              private storage: Storage,
              private menuController: MenuController,
              private navCtrl: NavController
             ) {}
    @ViewChild(IonSlides) slides: IonSlides;
    ionViewDidEnter() {
        document.addEventListener("backbutton",function(e) {
            console.log("disable back button")
        }, false);
    }
   ngOnInit() {
      this.storage.get('CountriesBeen.opened_slides').then((result) => {
          if (result == null) {
              this.storage.set('CountriesBeen.opened_slides', true);
              this.router.navigateByUrl('/login', { replaceUrl: true });
          }

      });
   }
    NextSlide() {
        this.slides.slideNext();
    }

    GoGo() {
    this.router.navigateByUrl('/login', { replaceUrl: true });
    }

    onFooterSkipButtonClick() {
        this.presentAlertConfirm();
    }

    onFooterNextButtonClick() {
            this.slides.slideNext();
    }

    async presentAlertConfirm() {
        const alert = await this.alertController.create({
            header: 'Are you sure?',
            buttons: [
                {
                    text: 'No',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {
                        console.log('Confirm Cancel');
                    }
                }, {
                    text: 'Yes',
                    handler: () => {
                            this.menuCtrl.enable(true);
                        this.router.navigateByUrl('/login', { replaceUrl: true });
                    }
                }
            ]
        });
        await alert.present();
    }
    setOpenedIntro() {
        this.storage.set('CountriesBeen.opened_slides', true);
    }
}
