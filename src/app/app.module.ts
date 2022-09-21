import { RouterModule } from '@angular/router';
import { MultiselectClickOutsideDirective } from './multiselect/multiselect-click-outside.directive';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MultiselectModule } from './multiselect/multiselect.module';
import { ToastContainerModule, ToastrModule } from 'ngx-toastr';
import {BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppCustomService } from './app.custom.service';
import { ImageMapComponent } from './image-map/image-map.component';
import { UiTourModule } from './ui-tour/ui-tour.module';
import { DropdownMenuComponent } from './dropdown-menu/dropdown-menu.component';
import {MatMenuModule} from '@angular/material/menu';
import { MenuItemComponent } from './dropdown-menu/menu-item/menu-item.component';
import {PortalModule} from '@angular/cdk/portal';
import { HomeLayoutComponent } from './home-layout/home-layout.component';
import { Layout1Component } from './home-layout/layouts/fixed/layout1/layout1.component';
import { Layout2Component } from './home-layout/layouts/fixed/layout2/layout2.component';
const initializeApplicationFunction = (app:AppCustomService)=>{
 return ()=>{
  return new Promise<void>((resolve,reject)=>{
    setTimeout(()=>{
      console.log('init');
      resolve();
    },5000)
  })
 }
}
@NgModule({
  declarations: [AppComponent, ImageMapComponent, DropdownMenuComponent, MenuItemComponent, HomeLayoutComponent, Layout1Component, Layout2Component],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule,
    MultiselectModule,
    ToastrModule.forRoot(),
    ToastContainerModule,
    BrowserAnimationsModule,
    HttpClientModule,RouterModule,
    MatButtonToggleModule,
    UiTourModule,
    MatMenuModule,
    PortalModule
  ],
  exports:[ImageMapComponent,DropdownMenuComponent],
  entryComponents:[Layout1Component,Layout2Component],
  providers: [
    AppCustomService,
    {
      provide: APP_INITIALIZER, useFactory: initializeApplicationFunction, multi: true, deps: [AppCustomService]
  },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

