import { Component, OnInit} from '@angular/core';


@Component({
  selector: 'contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
    public title: string;
    public emailcontacto: string;

    constructor(){
      this.title = 'Contact 0.0.1';
    }
    ngOnInit(){
      console.log('Componente Contact Cargado!')
    }

    guardarEmail() {
      localStorage.setItem('emailContacto', this.emailcontacto);
      
    }
}