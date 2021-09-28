import { Component, OnInit } from '@angular/core';
import { ClimaService } from '../../services/clima.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  imagenClima = "https://images-na.ssl-images-amazon.com/images/I/41wkG24yDkL.png";
  ciudad = '';
  loading = false;
  query = false;
  tempetura = 0;
  humedad = 0;
  clima = '';
  mostrarError = false;
  

  constructor(private _climaService: ClimaService) { }

  ngOnInit(): void {
  }

  obtenerClima() {
    this.query = true;
    this.loading = true;

    this._climaService.getClima(this.ciudad).subscribe(data =>{
      this.loading = false;
      this.query = true;
      this.tempetura = data.main.temp - 273
      this.humedad = data.main.humidity
      this.clima = data.weather[0].main
    }, error => {
      console.log(error);
      this.loading = false;
      this.error();
    })
  }

  error() {
    this.mostrarError = true;
    setTimeout(() => {
      this.mostrarError = false;
      this.ciudad = '';
      this.clima = '';
      this.tempetura = 0;
      this.humedad = 0;
    }, 3000);
  }
  
}
