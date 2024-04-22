import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RedireccionesService } from '../../service/redirecciones.service';
import { EmpleadosService } from '../../service/empleados.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  formUsuarios: FormGroup = new FormGroup({});
  contador: number = 5; // tiempo en segundos
  intervalo: any;
  intentos = 0;
  bloqueado = 0;

  incorrecto1 = 0;
  incorrecto2 = 0;

  constructor(private empleadosService: EmpleadosService, private redirecciones: RedireccionesService){}



  ngOnInit(): void{

    this.formUsuarios = new FormGroup({
      
      username: new FormControl ('', [Validators.required]),
      password: new FormControl ('', [Validators.required])

    });

  }

  login(){

    console.log(this.intentos);

    if (this.intentos == 2 && this.bloqueado == 0){
      this.bloqueado = 1;
      this.iniciarContador();
    }

    if (this.bloqueado == 0){
      
      this.empleadosService.login(this.formUsuarios.value).subscribe(resp=>{
        if(resp.message === "1"){
          this.bloqueado = 0;
          this.intentos == 0;
          this.incorrecto1 = 0;
          this.incorrecto2 = 0;
          this.redirecciones.haciaEmpleados();
        }
        else if(resp.message === "2"){
          this.intentos++;
          this.incorrecto1 = 1;
          //Usuario no existe
        }
        else if(resp.message === "3"){
          //Contraseña incorrecta
          this.intentos++;
          this.incorrecto2 = 1;
        }
  
      })

    }
    
  }

  iniciarContador() {
    this.intervalo = setInterval(() => {
      if (this.contador > 0) {
        this.contador--;
      } else {
        clearInterval(this.intervalo);
        this.bloqueado = 0;
        this.contador = 5; // Reinicia el contador después de que haya pasado el tiempo especificado
        this.intentos = 0; // Reinicia el contador de intentos de inicio de sesión
      }
    }, 1000); // intervalo de 1 segundo
  }


}
  
  
