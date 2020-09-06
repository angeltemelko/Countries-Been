import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {MenuController, NavController, Platform} from '@ionic/angular';
import {Storage} from '@ionic/storage';
import {timer} from 'rxjs';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
})
export class StartPage implements OnInit {
    private alreadySigned1 = false;
    showSplash = true;
    constructor(
        private router: Router,
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private menuController: MenuController,
        private storage: Storage) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
            timer(2000).subscribe(() => this.showSplash = false);
        });
    }

    ionViewDidEnter() {
        document.addEventListener("backbutton",function(e) {
            console.log("disable back button")
        }, false);
    }


    ngOnInit() {
        this.storage.get('CountriesBeen.opened_slides').then((result) => {
            if (result == null) {
                this.storage.set('CountriesBeen.opened_slides', true);
                this.router.navigateByUrl('/slides', { replaceUrl: true });
            } else {
                this.storage.get('CountriesBeen.pass').then((data) => {
                    if (!data) {
                        this.router.navigateByUrl('/login', { replaceUrl: true });
                    } else {
                        this.router.navigateByUrl('/home', { replaceUrl: true });
                    }
                });

            }

        });

    }
}




