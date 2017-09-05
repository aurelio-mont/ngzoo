import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'parque',
  templateUrl: './parque.component.html',
  styleUrls: ['./parque.component.css']
})
export class ParqueComponent implements OnChanges, OnInit, OnDestroy {
	@Input() name: string;
	@Input('metrosCuadrados') metros: number;
	public vegetacion: string;
	public abierto: boolean;

	@Output() pasameLosDatos = new EventEmitter();

  	constructor(){
  		this.name = 'Parque 0.0.1 - natural para caballos';
  		this.metros = 450;
  		this.vegetacion = 'Alta';
  		this.abierto = false;
  	}

  	ngOnInit(){
  		console.log("cargando componente parque")
  	}

  	ngOnChanges(changes: SimpleChanges){
  		//console.log(changes);
  		console.log('Existen cambios en las propiedades');
  	}

  	ngOnDestroy(){
  		console.log('componente destruido');
  	}

  	emitirEvento(){
  		this.pasameLosDatos.emit({
  			'name': this.name,
	  		'metros':this.metros,
	  		'vegetacion': this.vegetacion,
	  		'abierto': this.abierto
  		});
  	}
}