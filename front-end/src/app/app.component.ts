import { Component, DoCheck, OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck, OnInit {
  title = 'NGZOO';
  public emailcontacto: string;
  
  	ngDoCheck(){
  		//console.log('DoCheck se ha lanzado');
  		this.emailcontacto = localStorage.getItem('emailContacto');
  	}

  	ngOnInit (){
  		this.emailcontacto = localStorage.getItem('emailContacto');
  		//console.log(this.emailcontacto);
  	}

  	eliminarEmail(){
  		localStorage.removeItem('emailContacto');
  		localStorage.clear();
  		this.emailcontacto = null;
  	}
}
