import { Component, OnInit } from '@angular/core';
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css']
})
export class TiendaComponent implements OnInit {
	public title: string;
	public nombreDelParque: string;
	public miParque;

  	constructor(){
  		this.title = 'Tienda 0.0.1';
  	}

    ngOnInit(){
      $('#textojq').hide();
      $('#botonjq').click(function(){
        console.log('jq');
        $('#textojq').slideToggle();
      });
    }
  	mostrarNombre(){
  		console.log(this.nombreDelParque);
  	}

  	verDatosParque(event){
  		console.log(event);
  		this.miParque = event;
  	}
}