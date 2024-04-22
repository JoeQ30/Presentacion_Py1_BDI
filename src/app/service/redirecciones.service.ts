import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RedireccionesService {

  constructor(private router: Router) { }

  haciaEmpleados() {
    this.router.navigate(['/empleados']);
  }
  haciaLogin() {
    this.router.navigate(['/login']);
  }
  haciaMovimientos() {
    this.router.navigate(['/movimientos']);
  }


}
