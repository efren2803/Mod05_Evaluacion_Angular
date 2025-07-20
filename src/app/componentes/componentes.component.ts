import { Component, inject, OnInit } from '@angular/core';
import { ComponentesService } from '../services/componentes/componentes.service';
import { Componente } from '../services/componentes/Componente';

@Component({
  selector: 'app-componentes',
  standalone: true,
  imports: [],
  templateUrl: './componentes.component.html',
  styleUrl: './componentes.component.css'
})
export class ComponentesComponent implements OnInit {
  listaComponentes:Componente[] = [];

  compService = inject(ComponentesService);

  constructor(){
  }

  ngOnInit(): void {
    this.compService.getListaComponentes().subscribe(lc => this.procesarListaComponentes(lc)); 
  }

  procesarListaComponentes(lc: any): void {
    if(lc != null)
    {
      this.listaComponentes = lc;
    }
  }
}
