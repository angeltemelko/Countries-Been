import { Component, OnInit } from '@angular/core';
import {CountriesServiceService} from '../services/countries-service.service';
import {Storage} from '@ionic/storage';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})

export class ListPage implements OnInit {

  public hasFinishedLoading: boolean = false;
  public numberOfVisitedCountries: number = 0;

  private allCountries: any[] = [];
  public selectedCountries: any[] = [];

  constructor(
      private countriesService: CountriesServiceService,
      private storage: Storage
  ) {
    this.allCountries = this.countriesService.getAllCountries();

    this.storage.get('selected-countries').then((list) => {

      if(!list) {
        return;
      }

      this.selectedCountries = list;

    });
  }

  ngOnInit() {

  }

  getFilteredCountries() {
    return this.allCountries.filter(c => this.selectedCountries.includes(c.code));
  }
}
