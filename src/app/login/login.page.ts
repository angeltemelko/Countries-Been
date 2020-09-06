import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoadingController, MenuController, NavController, Platform, ToastController} from '@ionic/angular';
import {Router} from '@angular/router';
import {AndroidFingerprintAuth} from '@ionic-native/android-fingerprint-auth/ngx';
import {Storage} from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    loginForm: FormGroup;

    public alreadySigned;
    public alreadySigned2

    pass: string;
    user: string;

    isFingerprintAvailable = false;

  constructor(private navCtrl: NavController,
              public toastController: ToastController,
              private formBuilder: FormBuilder,
              private router: Router,
              private platform: Platform,
              private androidFingerprintAuth: AndroidFingerprintAuth,
              private storage: Storage,
              private menuController: MenuController,
              public loadingCtrl: LoadingController) {
      menuController.enable(false);
      this.ionViewDidEnter() ;

  }
    ionViewDidEnter() {
        document.addEventListener("backbutton",function(e) {
            console.log("disable back button")
        }, false);
    }
    ngOnInit() {
        this.platform.ready().then(() => {
            this.storage.get('CountriesBeen.pass').then((data) => {

                this.alreadySigned = data ? true : false;

            });
            this.storage.get('CountriesBeen.user').then((data) => {

                this.alreadySigned2 = data ? true : false;

            });
            if (this.platform.is('cordova') && this.platform.is('android')) {
                this.androidFingerprintAuth.isAvailable().then(() => {
                    this.isFingerprintAvailable = true;
                }, (error) => {
                    this.isFingerprintAvailable = false;
                }).catch(error => {
                    this.isFingerprintAvailable = false;
                });
            }
            else {
                this.isFingerprintAvailable = false;
            }


        });
        this.loginForm = this.formBuilder.group({
            password: ['', [
                Validators.required,
                Validators.minLength(6)
            ]],
                email: ['', [
                Validators.required,
                 Validators.email
             ]]
        });
    }

    async presentToast(message) {
        const toast = await this.toastController.create({
            message: message,
            duration: 2000
        });
        toast.present();
    }


    login() {
        if ((!this.loginForm.controls.password.valid) && (!this.loginForm.controls.password.valid)) {
            this.presentToast('Enter Correct email and pass to be at least 6 chars');
            return;
        }
        if (!this.loginForm.controls.email.valid) {
            this.presentToast('Enter the correct email');
            return;
        }
        if (!this.loginForm.controls.password.valid) {
            this.presentToast('The password should be at least 6 chars');
            return;
        }
        if(this.alreadySigned && this.alreadySigned2) {

            this.storage.get('CountriesBeen.user').then((username) => {
              if(this.user !== username)
              {
                  this.presentToast('The username is wrong');
                  return;
              }
              else {
            this.storage.get('CountriesBeen.pass').then((password) => {

                if(this.pass !== password){
                    this.presentToast('The password is wrong');
                    return;
                }
                else{
                    this.menuController.enable(true);
                    this.router.navigateByUrl('/home', { replaceUrl: true });
                }

                });
              }
            });

        }
        else {
            this.storage.set('CountriesBeen.user', this.user);
            this.storage.set('CountriesBeen.pass', this.pass);
            this.router.navigateByUrl('/home', { replaceUrl: true });
            this.menuController.enable(true);
        }
    }
    checkFingerprint() {

        this.androidFingerprintAuth.encrypt({
            clientId: 'myAppName',
            username: 'myUsername',
            password: 'myPassword'
        })
            .then(result => {
                if (result.withFingerprint) {
                    this.menuController.enable(true);
                    this.router.navigateByUrl('/home', { replaceUrl: true });
                } else if (result.withBackup) {
                    this.menuController.enable(true);
                    this.router.navigateByUrl('/home', { replaceUrl: true });
                } else {
                    this.presentToast('No Fingerprint');
                }
            })
            .catch(error => {
                if (error === this.androidFingerprintAuth.ERRORS.FINGERPRINT_CANCELLED) {
                    this.presentToast('Fingerprint cancelled');
                } else { console.error(error); }
            });
    }
    loginWithFacebook() {
      this.menuController.enable(true);
        this.router.navigateByUrl('/home', { replaceUrl: true });
    }

}
