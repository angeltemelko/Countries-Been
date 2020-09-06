import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'start',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  { path: 'slides', loadChildren: './slides/slides.module#SlidesPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'start', loadChildren: './start/start.module#StartPageModule' },
  { path: 'about', loadChildren: './about/about.module#AboutPageModule' },
  { path: 'test', loadChildren: './test/test.module#TestPageModule' },
  { path: 'statistics', loadChildren: './statistics/statistics.module#StatisticsPageModule' },
  { path: 'List Of Capitals', loadChildren: './list-of-capitals/list-of-capitals.module#ListOfCapitalsPageModule' },
  { path: 'capitals', loadChildren: './capitals/capitals.module#CapitalsPageModule' },
  { path: 'country/:code', loadChildren: './country/country.module#CountryPageModule' },
  { path: 'images', loadChildren: './images/images.module#ImagesPageModule' },
  { path: 'image', loadChildren: './image/image.module#ImagePageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
