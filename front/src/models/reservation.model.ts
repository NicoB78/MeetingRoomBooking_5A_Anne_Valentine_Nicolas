import { Timestamp } from "rxjs";

//reservation.model.ts
export class Reservation {
  id: number | null;
  debut: Date;
  fin: Date;
  idLeader: number;
  idRoom: number;




  constructor(id: number | null, debut: Date, fin: Date, idLeader: number, idRoom: number) {
    this.id = id;
    this.debut = debut;
    this.fin = fin;
    this.idLeader = idLeader;
    this.idRoom = idRoom;

  }
}
