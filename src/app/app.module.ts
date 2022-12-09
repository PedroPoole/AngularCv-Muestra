import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { TarjetaComponent } from './tarjeta/tarjeta.component';
import { SeccionComponent } from './seccion/seccion.component';

import { OrderModule } from 'ngx-order-pipe';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbdModalBasic } from './modal-video/modal-video.component';

import { YouTubePlayerModule } from "@angular/youtube-player";
import { DatospersonalesComponent } from './datospersonales/datospersonales.component';



@NgModule({
  declarations: [
    TarjetaComponent,
    SeccionComponent,
    AppComponent,
    NgbdModalBasic,
    DatospersonalesComponent,
    
  ],
  imports: [
    BrowserModule,
    OrderModule,
    NgbModule,
    YouTubePlayerModule
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
