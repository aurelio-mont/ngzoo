import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'animals',
  templateUrl: './animals.component.html',
  styleUrls: ['./animals.component.css']
})
export class AnimalsComponent implements OnInit {
	public title: string

  	constructor(){
  		this.title = 'Animals 0.0.1'
  	}

  	ngOnInit(){
      console.log('Componente Animals Cargado!')
    }
}