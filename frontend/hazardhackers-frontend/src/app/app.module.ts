import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AnalysisComponent } from './analysis/analysis.component';
import { HttpClientModule } from '@angular/common/http';
import { AnalysisService } from './analysis/analysis.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { ImagesComponent } from './images/images.component';
import { ImageComponent } from './images/image/image.component';
import { ImageListComponent } from './images/image-list/image-list.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NavbarComponent } from './navbar/navbar.component';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { HomeComponent } from './home/home.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { AboutComponent } from './about/about.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { ResultsComponent } from './results/results.component';

@NgModule({
  declarations: [
    AppComponent,
    AnalysisComponent,
    ImagesComponent,
    ImageComponent,
    ImageListComponent,
    NavbarComponent,
    HomeComponent,
    MainNavComponent,
    AboutComponent,
    ResultsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    MatListModule,
    MatButtonModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatExpansionModule
  ],
  providers: [AnalysisService],
  bootstrap: [AppComponent]
})
export class AppModule { }
