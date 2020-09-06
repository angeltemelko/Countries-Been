import { Component, OnInit  } from '@angular/core'
import { ActivatedRoute , Router} from '@angular/router'
import {CountriesServiceService} from '../services/countries-service.service'
import {Storage} from '@ionic/storage'
import {Camera,CameraOptions} from '@ionic-native/camera/ngx';
import {AlertController, ToastController} from '@ionic/angular';

import useState from '../utils/useState'
const [getImage, setImage] = useState('')

export {getImage}

@Component({
  selector: 'app-country',
  templateUrl: './country.page.html',
  styleUrls: ['./country.page.scss'],
})
export class CountryPage implements OnInit{
  country = {
    code: '',
    name: '',
    flag: ''
  }
  gallery: any = [];
  myImage: string;

  constructor(
      private activatedRoute: ActivatedRoute,
      private countriesService: CountriesServiceService,
      private storage: Storage,
      private camera: Camera,
      private router: Router,
      private toastController: ToastController,
      private alertController: AlertController
  ) {

    activatedRoute.params.subscribe(({ code }) => {
      this.country = countriesService.getAllCountries().find(
          e => e.code === code
      )

      this.storage.get('CountriesBeen.gallery.' + code).then(data => {
        if(data){
          this.gallery = data;
        }
      });
    })
  }

  navigateImage(item){
    setImage(item)
    this.router.navigateByUrl('/image')
  }

  deleteImage(index) {
    /* const newGallery = this.gallery.filter((e, id) => id !== index)
     this.storage.set('CountriesBeen.gallery.' + this.country.code, newGallery)
     this.gallery = newGallery
     this.presentToast("Deleted!") */
    this.presentAlertConfirm(index);
  }

  takePhoto(){
    const options: CameraOptions = {
      quality: 100,
      targetWidth: 700,
      targetHeight: 700,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA
    };

    this.camera.getPicture(options).then((imageData) => {

      let image = 'data:image/jpeg;base64,' + imageData;
      this.gallery.push(image);
      this.storage.set('CountriesBeen.gallery.' + this.country.code, this.gallery);
      this.presentToast("Picture Captured!")
    }, (err) => {
      // Handle error
    });
  }
  deleteItem(index){
    this.presentAlertConfirm(index);
  }
  goPage(){}
  async presentAlertConfirm(index) {
    const alert = await this.alertController.create({
      header: 'Do you want to delete it?',
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
            const newGallery = this.gallery.filter((e, id) => id !== index)
            this.storage.set('CountriesBeen.gallery.' + this.country.code, newGallery)
            this.gallery = newGallery
            this.presentToast("Deleted!")
          }
        }
      ]
    });

    await alert.present();
  }

  uploadPhoto = code =>{
    const options: CameraOptions = {
      quality: 100,
      targetWidth: 700,
      targetHeight: 700,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false
    };

    this.camera.getPicture(options).then((imageData) => {

      const image = 'data:image/jpeg;base64,' + imageData;
      this.gallery.push(image);
      this.storage.set('CountriesBeen.gallery.' + this.country.code, this.gallery);
      this.presentToast("Picture Uploaded!")
    }, (err) => {
      // Handle error
    });

  }
  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  ngOnInit(){
  }
}
