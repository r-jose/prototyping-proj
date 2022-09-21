import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { PortalModule } from '@angular/cdk/portal';
import { HomeLayoutComponent } from './home-layout/home-layout.component';
import { Layout1Component } from './home-layout/layouts/fixed/layout1/layout1.component';
import { Layout2Component } from './home-layout/layouts/fixed/layout2/layout2.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeLayoutComponent,
    Layout1Component,
    Layout2Component,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,
    PortalModule,
  ],
  exports: [],
  entryComponents: [Layout1Component, Layout2Component],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
