import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormGroupComponent } from './component/dynamic-form-group/dynamic-form-group.component';
import { HttpClientModule } from '@angular/common/http';
import { WizardComponent } from './component/wizard/wizard.component';
import { ScreenComponent } from './component/wizard/component/screen/screen.component';

@NgModule({
  declarations: [
    AppComponent,
    DynamicFormGroupComponent,
    WizardComponent,
    ScreenComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
