import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AndroidFingerprintAuth} from '@ionic-native/android-fingerprint-auth/ngx';
import {IonicStorageModule} from '@ionic/storage';
import { AmChartsModule } from '@amcharts/amcharts3-angular';
import { RelativeTimePipe } from './pipes/relative-time.pipe';
import { Camera } from '@ionic-native/camera/ngx';
import {HttpClient, HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, RelativeTimePipe],
  entryComponents: [

  ],
  imports: [
      ReactiveFormsModule,
      BrowserModule,
      IonicModule.forRoot(),
      AppRoutingModule,
      FormsModule,
      HttpClientModule,
      AmChartsModule,
      IonicStorageModule.forRoot()
  ],
  providers: [
    StatusBar,
      Camera,
    SplashScreen,
    AndroidFingerprintAuth,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
