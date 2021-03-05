import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GenerComponent } from './gener/gener.component';
import { GenerBooksComponent } from './gener-books/gener-books.component';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule} from '@angular/forms';  
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    GenerComponent,
    GenerBooksComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    InfiniteScrollModule
  ],
  providers: [ [ {provide: LocationStrategy, useClass: HashLocationStrategy}]],
  bootstrap: [AppComponent]
})
export class AppModule { }
