import { Component, OnInit } from '@angular/core';

import {HttpClient} from "@angular/common/http";

import { Reservation } from 'src/models/reservation.model';
import { ReservationService } from '../services/reservation.service';
import {AdminService} from "../services/admin.service";

@Component({
  selector: 'app-list-reservations',
  templateUrl: './list-reservations.component.html',
  styleUrls: ['./list-reservations.component.scss']
})
export class ListReservationsComponent implements OnInit {

  reservations: Reservation[];
  constructor(private http: HttpClient, private adminService: AdminService, private reservationService: ReservationService) {
    this.reservations=[];
  }

  ngOnInit() {
    this.reservationService.getReservations().subscribe(reservations => this.reservations = reservations)
  }

  deleteReservation(id: number | null){
    this.reservationService.deleteReservation(id).subscribe(() => this.reservations = this.reservations.filter(reservation => reservation.id !== id));
  }

  DateReservation(debut: Date, fin:Date, id: number) {
    var dateDebut = new Date(debut)
    var dateFin = new Date(fin)

    var dateForHTML = dateDebut.getFullYear()+"/"+(dateDebut.getMonth()+1)+"/"+dateDebut.getDate()
    var dateText = document.getElementById("date_reservation"+id)
    if(dateText != null){
      dateText.textContent = dateForHTML;
    }

    var debutForHTML = dateDebut.getHours() + ":00";
    var debutText = document.getElementById("debut_reservation"+id)
    if(debutText != null){
      debutText.textContent = debutForHTML;
    }

    var finForHTML = dateFin.getHours() + ":00";
    var debutText = document.getElementById("fin_reservation"+id)
    if(debutText != null){
      debutText.textContent = finForHTML;
    }
  }
}
