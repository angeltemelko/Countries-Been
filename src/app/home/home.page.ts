import {Component, AfterViewInit, OnDestroy, ViewChild, ElementRef} from '@angular/core';
import {Router} from '@angular/router';
import {LoadingController, PopoverController, ToastController} from '@ionic/angular';
import { AmChartsService, AmChart } from '@amcharts/amcharts3-angular';
import {CountriesServiceService} from '../services/countries-service.service';
import {Storage} from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],

})
export class HomePage implements AfterViewInit, OnDestroy {
    private chart: AmChart;
    private PopoverComponent: any;
    activity = 0;

    public countCountries = 0;

    private allCountries = [];

    private selectedCountries = [];

    public hasMapLoaded = false;

  constructor(private router: Router,
              public popoverController: PopoverController,
              private AmCharts: AmChartsService,
              private countriesService: CountriesServiceService,
              private storage: Storage,
              private toastController: ToastController) {
      this.allCountries = this.countriesService.getAllCountries();


  }
  ionViewDidEnter()
  {
      document.addEventListener("backbutton",function (e) {
          console.log("disable back button")

      },false);
  }
    async presentToast(message) {
        const toast = await this.toastController.create({
            message: message,
            duration: 2000
        });
        toast.present();
    }

    goLogin() {
        this.router.navigate(['/slides']);
    }

   ngAfterViewInit() {
        this.chart = this.AmCharts.makeChart('chartdiv', {
            'type': 'map',
            'theme': 'light',
            'projection': 'eckert3',
            'dataProvider': {
                'map': 'worldLow',
                'getAreasFromMap': true
            },
            'areasSettings': {
                'selectedColor': '#CC0000',
                'selectable': true
            },
        });
       this.AmCharts.addListener(this.chart, 'clickMapObject', (e) => {
               if (e.mapObject.objectType !== 'MapArea') {
                   return;
               }
               const area = e.mapObject;
               // Toggle showAsSelected
               area.showAsSelected = !area.showAsSelected;
               e.chart.returnInitialColor(area);
                this.selectedCountries = this.getSelectedCountries();

       });
       this.AmCharts.addListener(this.chart, 'init', (e) => {
           this.storage.get('selected-countries').then((list) => {
               if(!list) {
                   return;
               }
               this.selectedCountries = list;
               for(var i = 0; i < list.length; i++) {
                   var area = this.chart.getObjectById(list[i]);
                   area.showAsSelected = true;
                   this.chart.returnInitialColor(area);
               }
           });
       });
    }
    ngAfterContentInit() {
        //this.selectedCountries = this.getSelectedCountries();
        this.hasMapLoaded = true;
    }

    getSelectedCountries() {
        const selected = [];

        for (let i = 0; i < this.chart.dataProvider.areas.length; i++) {
            if (this.chart.dataProvider.areas[i].showAsSelected) {
                selected.push(this.chart.dataProvider.areas[i].id);
            }
        }

        return selected;
    }

    ngOnDestroy() {
        if (this.chart) {
            this.AmCharts.destroyChart(this.chart);
        }
    }

    saveCountries() {
        let selectedCountries = this.getSelectedCountries();
        this.storage.set('selected-countries', selectedCountries).then(() => {
            console.log('done');
        });
        this.presentToast('Saved!');
    }

}

