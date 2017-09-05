import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'keeper',
  templateUrl: './keeper.component.html',
  styleUrls: ['./keeper.component.css']
})
export class KeeperComponent implements OnInit {
  public title: string;

    constructor(){
      this.title = 'Keeper 0.0.1';
    }
    ngOnInit(){
      console.log('Componente Keeper Cargado!')
    }
}