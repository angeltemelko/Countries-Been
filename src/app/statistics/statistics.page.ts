import {Component, OnInit, AfterViewInit, OnDestroy} from '@angular/core';
import { AmChartsService, AmChart } from '@amcharts/amcharts3-angular';
import {Storage} from '@ionic/storage';
import {CountriesServiceService} from '../services/countries-service.service';
@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.page.html',
  styleUrls: ['./statistics.page.scss'],
})
export class StatisticsPage implements OnInit, AfterViewInit, OnDestroy {
    private chart: AmChart;
    public visited: any[] = [];

    private allCountries: any[] = [];

  constructor(
      private AmCharts: AmChartsService,
      private countriesService: CountriesServiceService,
      private storage: Storage
  ) {
      this.allCountries = this.countriesService.getAllCountries();
  }

  ngOnInit() {
  }

    ngAfterViewInit() {

        this.storage.get('selected-countries').then((list) => {

            if(!list) {
                return;
            }
            this.visited=list;
            console.log(this.visited.length);

            this.chart = this.AmCharts.makeChart('chartdiv1',  {
                'type': 'pie',
                'theme': 'light',
                'dataProvider': [ {
                    'title': 'Visited',
                    'value': list.length
                }, {
                    'title': 'Not Visited',
                    'value': this.allCountries.length - list.length
                } ],
                'titleField': 'title',
                'valueField': 'value',
                'labelRadius': 5,
                'radius': '42%',
                'innerRadius': '60%',
                'labelText': '[[title]]',
                'export': {
                    'enabled': true
                }
            } );

        });

    }

    ngOnDestroy() {
        if (this.chart) {
            this.AmCharts.destroyChart(this.chart);
        }
    }

}
