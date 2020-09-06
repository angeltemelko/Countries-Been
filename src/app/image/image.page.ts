import { Component, OnInit, } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import {getImage} from '../country/country.page';

@Component({
  selector: 'app-image',
  templateUrl: './image.page.html',
  styleUrls: ['./image.page.scss'],
})
export class ImagePage implements OnInit {
  image = ''
  constructor() {
      console.log(getImage())
      this.image = getImage()
  }

  ngOnInit() {
  }

}
