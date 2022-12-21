import {Timestamp} from "rxjs";

export class Attendee {
  id: number| null;
  idMember: number;
  idReservation: number| null;

  constructor(id: number | null, idMember: number, idReservation: number| null) {
    this.id = id;
    this.idMember = idMember;
    this.idReservation= idReservation;
  }

}
