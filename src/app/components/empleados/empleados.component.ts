import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { RedireccionesService } from '../../service/redirecciones.service';
import { EmpleadosService } from '../../service/empleados.service';
import { EmpleadosModel } from '../../model/empleados-model';

@Component({
  selector: 'app-empleados',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, ReactiveFormsModule, CommonModule],
  templateUrl: './empleados.component.html',
  styleUrl: './empleados.component.scss'
})
export class EmpleadosComponent implements OnInit{

  listEmpleados: EmpleadosModel [] = [];

  repetido = 0;
  puesto = "";


  formBuscar: FormGroup = new FormGroup({});
  formEmpleados: FormGroup = new FormGroup({});
  constructor(private empleadosService: EmpleadosService, private redirecciones: RedireccionesService){}

  ngOnInit(): void{
    this.listN("");
    this.formBuscar = new FormGroup({
      buscar: new FormControl ('')
    });

    this.formEmpleados = new FormGroup({
      nombre : new FormControl ('', [Validators.required]),
      identidad : new FormControl('' , [Validators.required, Validators.pattern(/^\d+$/)]),
      puesto : new FormControl (''),
      status : new FormControl('1')
    });

  }

  insert(){
    console.log(this.repetido);
      this.formEmpleados.controls['status'].setValue('1');
      this.repetido = 0;

      if (this.formEmpleados.get('nombre')?.value !== null || this.formEmpleados.get('nombre')?.value !== ''){

        this.empleadosService.insertEmpelados(this.formEmpleados.value).subscribe(resp=>{
          console.log(resp);
          if(resp.message === "1"){
            console.log(resp);
            this.repetido = 0;
            this.listN("");
            this.formEmpleados.reset();
            
          } else if (resp.message === "2" || resp.message === "3"){
            this.repetido = 1;
          }
          
        })


      }

      

  }

  buscar(){
    const valor = this.formBuscar.get('buscar')?.value;

    if ( valor.trim() === '' || valor === null){
      this.listN(valor.trim());
    } else if (isNaN(valor)){
      this.listN(valor);
    } else{
      this.listI(Number(valor));

    }
  }

  listN(nm: string){
    this.empleadosService.listn(nm).subscribe(resp=>{
      if(resp){
        this.listEmpleados = resp;
      }
    });
  }

  listI(id: number){
    this.empleadosService.listi(id).subscribe(resp=>{
      if(resp){
        this.listEmpleados = resp;
      }
    });
  }

  asignar(nPuesto: string){

    this.formEmpleados.patchValue({
      puesto: nPuesto
    });

  }

  close(){
    this.formEmpleados.reset();
    this.repetido = 0;
  }

  logout(){

    this.redirecciones.haciaLogin();

  }
  


}
