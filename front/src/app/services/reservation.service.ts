
//reservation.service.ts
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable, Timestamp} from "rxjs";
import {Reservation} from "../../models/reservation.model";
import { Member } from "src/models/member.model";
import {Room} from "../../models/room.model";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private url: string;
  //roomsId: Number[] = [];
  reservationByDay: Reservation[];
  dayChosenForReservation:Date;

  constructor(private http: HttpClient) {
    this.url = environment.url;
  }

  getReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.url}/reservations`);
  }

  addReservation(reservation: Reservation): Observable<Reservation> {
    return this.http.post<any>(`${this.url}/reservations`, reservation);
  }

  deleteReservation(id: number| null): Observable<any> {
    return this.http.delete(`${this.url}/reservations/${id}`);
  }

  getReservationByLeaderId(id : number| null): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.url}/reservations/${id}`);
  }

  getIdLastReservation(): Observable<number> {
    return this.http.get<number>(`${this.url}/reservations/idLastReservation`);
  }

  getReservationbyDay(startingTs : Number, endingTs : Number): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.url}/reservations/filterByDay/${startingTs}/${endingTs}`);
  }

  getIdRoomAvailableByDay(startingTs : Number, endingTs : Number): Observable<Number[]> {
    return this.http.get<Number[]>(`${this.url}/reservations/filterByRoom/${startingTs}/${endingTs}`);
  }

  getReservationsById(idReservations : number[]): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.url}/reservations/listReservationsById/${idReservations}`);
  }
  /*getReservationById(id: number | null): Observable<Reservation> {
    console.log('id : ', id)
    return this.http.get<Reservation>(`${this.url}/reservations/${id}`);
  }*/
}
