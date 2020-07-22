import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent implements OnInit {

  navlist: any[];

  constructor() {
    this.navlist = [
      {
        link: './cotizacion/albañileria',
        item: 'Albañileria'
      },
      {
        link: './cotizacion/alquiler',
        item: 'Alquiler de H. & M.'
      },
      {
        link: './cotizacion/electricidad',
        item: 'Electricidad'
      },
      {
        link: './cotizacion/gypsuma',
        item: 'Gypsum A.'
      },
      {
        link: './cotizacion/mecanicai',
        item: 'Mecánica I.'
      },
      {
        link: './cotizacion/plomeria',
        item: 'Plomeria'
      },
      {
        link: './cotizacion/seguridade',
        item: 'Seguridad E.'
      }
    ]

   }

  ngOnInit(): void {
  }

}
