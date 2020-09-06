import { Component } from '@angular/core';

import {AlertController, Platform} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {Router} from '@angular/router';
import { timer } from 'rxjs';
import { AmChartsService, AmChart } from '@amcharts/amcharts3-angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class AppComponent {
    private chart: AmChart;
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'List',
      url: '/list',
      icon: 'list'
    },
      {
          title: 'Statistics',
          url: '/statistics',
          icon: 'stats'
      },
      {
          title: 'Capitals',
          url: '/capitals',
          icon: 'locate'
      },
      {
          title: 'About',
          url: '/about',
          icon: 'information-circle'
      }

  ];
  showSplash = true;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private alertController: AlertController,
    private router: Router,
    private AmCharts: AmChartsService,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
        timer(2000).subscribe(() => this.showSplash = false);
    });
  }

    logOut() {
        this.presentLogOutAlert();
    }
    async presentLogOutAlert() {
        const alert = await this.alertController.create({
            header: 'Are you sure?!',
            message: 'Are you sure you want to log out?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: (blah) => {
                        console.log('Confirm Cancel: blah');
                    }
                }, {
                    text: 'Okay',
                    handler: () => {
                        console.log('Confirm Okay');
                        this.router.navigateByUrl('/login', { replaceUrl: true });
                    }
                }
            ]
        });

        await alert.present();
    }

}
