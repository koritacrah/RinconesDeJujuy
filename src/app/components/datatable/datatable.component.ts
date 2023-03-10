import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Reserva } from 'src/app/models/reserva';
import { ReservaService } from 'src/app/services/reserva.service';
import { SingleCheckComponent } from '../single-check/single-check.component';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.css']
})
export class DatatableComponent implements OnInit {

  displayedColumns: string[] = ['Titular', 'NomApe', 'fechaLlegada', 'fechaSalida', "acciones"];
  dataSource = new MatTableDataSource<Reserva>([]);

  reservas: Array<Reserva> = [];
  reservasFirmadas: Array<Reserva> = [];
  reservasNoFirmadas: Array<Reserva> = [];

  //id:string= "6409f9e7b8fc5cee48affc51";

  @Output () eventData = new EventEmitter<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  searchKey!: string;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(private reservaService: ReservaService,
    private router: Router, private modalService: NgbModal) {

  }

  ngOnInit(): void {
    this.obtenerReservas();
    //this.obtenerReservasFiltradas();
    //  console.log(this.reservas, "reservas");
    //  this.dataSource.data = this.reservas;
    //  console.log(this.dataSource.data, "data");

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    
    console.log(this.dataSource.data, "filter")
    // if (this.dataSource.paginator) {
    //   this.dataSource.paginator.firstPage();
    // }
  }


  // open() {
	// 	const modalRef = this.modalService.open(SingleCheckComponent);
	// 	modalRef.componentInstance.name = 'World';
	// }

  selectedReserva(reserva: Reserva): void {
    this.eventData.emit(reserva);
  }

  async obtenerReservas() {
    await new Promise(f => setTimeout(f, 10));
    this.reservaService.getReservas().subscribe(
      (result) => {
        this.reservas = result.msg;
        this.dataSource.data = this.reservas;
        console.log(this.dataSource.data, "data");
      },
      error => { alert("Error en la petición"); }
    )
  }

  async obtenerReservasFiltradas() {
    await new Promise(f => setTimeout(f, 10));
    this.reservaService.getReservasFiltro().subscribe(
      (result) => {
        this.reservasFirmadas = result.firmadas;
        console.log(this.reservasFirmadas, "result firmadas");
        this.reservasNoFirmadas = result.nofirmadas;
        console.log(this.reservasNoFirmadas, "result no frimardas");
      },
      error => { alert("Error en la petición"); }
    )
  }

  onChange($event:any){
    // let filteredData = 
    // this.dataSource = new MatTableDataSource(filteredData);
    alert("Funca")
  }

  // async obtenerUnaReserva(){
  //   // this.reservaService.getReserva(this.id).subscribe(
  //   //   (result) => {
  //   //     result.forEach((element:any) => {
  //   //     // this.pasaje = new Pasaje();
  //   //     // Object.assign(this.pasaje, element)
  //   //   });
  //   // })
  //   this.reservaService.getReserva(this.id).subscribe(
  //     (result) => {
  //         console.log(result, "reserva");
  //     }
  //   )
  // }
}
