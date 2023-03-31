import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// PrimerimNG Modules
import { OrderListModule } from 'primeng/orderlist';
import { CardModule } from 'primeng/card';
import { VirtualScrollerModule } from 'primeng/virtualscroller';
import { ButtonModule } from 'primeng/button';

// Components
import { AppComponent } from './app.component';
import { WeatherComponent } from './weather/weather.component';
import { NewsComponent } from './news/news.component';
import { LocalFilesComponent } from './local-files/local-files.component';

@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent,
    NewsComponent,
    LocalFilesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    OrderListModule,
    HttpClientModule,
    CardModule,
    VirtualScrollerModule,
    ButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
