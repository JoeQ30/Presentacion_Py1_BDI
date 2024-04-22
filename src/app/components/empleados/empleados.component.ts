import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { RedireccionesService } from '../../service/redirecciones.service';
import { EmpleadosService } from '../../service/empleados.service';
import { EmpleadosModel } from '../../model/empleados-model';
import { MovimientosModel } from '../../model/movimientos-model';

@Component({
  selector: 'app-empleados',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, ReactiveFormsModule, CommonModule],
  templateUrl: './empleados.component.html',
  styleUrl: './empleados.component.scss'
})
export class EmpleadosComponent implements OnInit{

  listEmpleados: EmpleadosModel [] = [];
  listMovimientos: MovimientosModel [] = [];

  repetido = 0;
  puesto = "";
  id = 0;
  nId = 0;
  nomb = "";
  tipoMovimiento = "";


  formBuscar: FormGroup = new FormGroup({});
  formEmpleados: FormGroup = new FormGroup({});
  formMovimientos: FormGroup = new FormGroup({});
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

    this.formMovimientos = new FormGroup({
      tipomovimiento : new FormControl ('', [Validators.required]),
      monto : new FormControl('' , [Validators.required, Validators.pattern(/^\d+$/)]),
      status : new FormControl('1')
    });

  }

  insert(){
    console.log(this.repetido);
      this.formEmpleados.controls['status'].setValue('1');
      this.repetido = 0;

      if (this.formEmpleados.get('nombre')?.value !== null || this.formEmpleados.get('nombre')?.value !== ''){

        this.empleadosService.insertEmpleados(this.formEmpleados.value).subscribe(resp=>{
          
          if(resp.message === "1"){
            this.repetido = 0;
            this.listN("");
            this.formEmpleados.reset();
            
          } else if (resp.message === "2" || resp.message === "3"){
            this.repetido = 1;
          }
          
        })


      }

      

  }

  modEmpleado(){

    console.log(this.id);
    console.log(this.nId);
    console.log(this.puesto);
    console.log(this.nomb);
    

    this.empleadosService.modEmpleados(this.id, this.nomb, this.puesto, this.nId).subscribe(resp=>{

      if(resp.message == 1){

        this.repetido = 0;
        this.formEmpleados.reset();
        this.listN("");

      }
      if(resp.message == 2){
        this.repetido = 1;
      }
      if(resp.message == 3){
        this.repetido = 1;
      }
    });

  }

  deleteEmpleado(id: number){
    this.empleadosService.deleteEmpleados(id).subscribe(resp=>{
      if(resp.message == 1){
        this.listN("");
      }
    });
  }

  insertarMovi(){

    const monto = this.formMovimientos.get('monto')?.value;

    this.empleadosService.insertMovimientos(this.id, this.tipoMovimiento, monto).subscribe(resp=>{
      if(resp.message === "1"){
        this.formMovimientos.reset();
      }
        
    })

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

  listMovi(){

    this.empleadosService.listmovi(this.id).subscribe(resp=>{
      if(resp){
        this.listMovimientos = resp;
      }
    });
  }

  asignarId(id: number){
    this.id = id;
  }

  asignarNid(id: number){
    this.nId = id;
  }

  asignarNomb(nm: string){
    this.nomb = nm;
  }

  asignar(nPuesto: string){
    this.puesto = nPuesto;

    this.formEmpleados.patchValue({
      puesto: nPuesto
    });

  }

  asignarMovi(nMovi: string){

    this.tipoMovimiento = nMovi;

    this.formMovimientos.patchValue({
      tipomovimiento : nMovi
    });

  }

  close(){
    this.formEmpleados.reset();
    this.repetido = 0;
  }

  closeMov(){
    this.formMovimientos.reset();
    this.listMovimientos = [];
  }

  logout(){

    this.redirecciones.haciaLogin();

  }
  


}
