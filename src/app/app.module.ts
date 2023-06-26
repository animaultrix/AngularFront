import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SectionsComponent } from './sections/sections.component';
import { InputComponent } from './sections/input/input.component';
import { UsuarioService } from './services/usuario/usuario.service';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './sections/register/register.component';
import { GraficaMesComponent } from './sections/grafica-mes/grafica-mes.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SectionsComponent,
    InputComponent,
    RegisterComponent,
    GraficaMesComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    UsuarioService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
