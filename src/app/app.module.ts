import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ResetPasswordComponent } from './login/reset-password/reset-password.component';
import { RegisterComponent } from './login/register/register.component';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { DbService } from './services/db.service';
import { AddCategoryModalComponent } from './modals/add-category-modal/add-category-modal.component';
import { AddProductModalComponent } from './modals/add-product-modal/add-product-modal.component';
import { EditProductModalComponent } from './modals/edit-product-modal/edit-product-modal.component';
import { EditarCategoryModalComponent } from './modals/editar-category-modal/editar-category-modal.component';
import { EditUserModalComponent } from './modals/edit-user-modal/edit-user-modal.component';
import { UpdateClientComponent } from './modals/update-client/update-client.component';
import { AddUserModalComponent } from './modals/add-user-modal/add-user-modal.component';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { AuthService } from './services/auth.service';
import { Camera } from '@awesome-cordova-plugins/camera/ngx';

@NgModule({
  declarations: [AppComponent, 
    ResetPasswordComponent,
    RegisterComponent,
    AddCategoryModalComponent,
    AddProductModalComponent,
    EditProductModalComponent,
    EditarCategoryModalComponent,
    AddUserModalComponent,
    EditUserModalComponent,
    UpdateClientComponent
  ],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, FormsModule, ReactiveFormsModule, MatButtonModule, HttpClientModule],
  exports: [MatButtonModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, SQLite, DbService, NativeStorage, AuthService, Camera], 
  bootstrap: [AppComponent],
})
export class AppModule {}
