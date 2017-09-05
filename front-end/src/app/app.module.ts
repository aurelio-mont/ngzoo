import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

//configuracion de Rutas
import { appRoutingProvider, routing } from './app.routing';
//Componentes
import { AppComponent } from './app.component';
import { AnimalsComponent } from './components/animals/animals.component';
import { ContactComponent } from './components/contact/contact.component';
import { HomeComponent } from './components/home/home.component';
import { KeeperComponent } from './components/keeper/keeper.component';
import { TiendaComponent } from './components/tienda/tienda.component';
import { ParqueComponent } from './components/parque/parque.component';

@NgModule({
  declarations: [
    AppComponent,
    AnimalsComponent,
    ContactComponent,
    HomeComponent,
    KeeperComponent,
    TiendaComponent,
    ParqueComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [
    appRoutingProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
