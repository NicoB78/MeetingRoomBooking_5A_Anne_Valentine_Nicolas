import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";

import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import { ReservationService } from '../services/reservation.service';
import { Reservation } from 'src/models/reservation.model';
import {MemberService} from "../services/member.service";
import {Member} from "../../models/member.model";
import {Observable, Subscription, Timestamp, timestamp} from "rxjs";
import {Room} from "../../models/room.model";
import {RoomService} from "../services/room.service";
import {Attendee} from "../../models/attendee.model";
import {AttendeeService} from "../services/attendee.service";

@Component({
  selector: 'app-add-reservation',
  templateUrl: './add-reservation.component.html',
  styleUrls: ['./add-reservation.component.scss']
})
export class AddReservationComponent implements OnInit {
  members: Member[];
  rooms: Room[];
  reservations: Reservation[];
  idLastReservation: number;


  constructor(private httpClient: HttpClient, private router: Router, private reservationService: ReservationService,
              private memberService: MemberService, private roomService: RoomService, private attendeeService: AttendeeService) {
    this.members=[];
    this.rooms=[];
    this.reservations=[];
    this.idLastReservation=0;
  }

  ngOnInit() {
    this.memberService.getMembers().subscribe(members => this.members = members)
    this.roomService.getRooms().subscribe(rooms => this.rooms = rooms)
    this.reservationService.getReservations().subscribe(reservations => this.reservations = reservations);
  }


  async onSubmit(ngForm: NgForm) {

    const reservation = new Reservation(
      null,
      ngForm.form.value.debut,
      ngForm.form.value.fin,
      ngForm.form.value.idLeader,
      ngForm.form.value.idRoom,
    )

    this.reservationService.addReservation(reservation).subscribe();

    await new Promise(f => setTimeout(f, 1000));
    this.reservationService.getIdLastReservation().subscribe(id => this.idLastReservation = id)
    await new Promise(f => setTimeout(f, 1000));

    const attendee = new Attendee(
      null,
      ngForm.form.value.idAttendee,
      this.idLastReservation
    )
    this.attendeeService.addAttendee(attendee).subscribe();

    setTimeout(()=>this.router.navigateByUrl('/list-reservations'), 1000)
  }

}
