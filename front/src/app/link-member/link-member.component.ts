import {Component, OnInit} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {filter} from "rxjs";
import {MemberService} from "../services/member.service";
import {RoomService} from "../services/room.service";
import {Room} from "../../models/room.model";
import { Member } from "src/models/member.model";
import {ReservationService} from "../services/reservation.service";
import {Reservation} from "../../models/reservation.model";
import {AttendeeService} from "../services/attendee.service";
import {AdminService} from "../services/admin.service";

@Component({
  selector: 'app-link-member',
  templateUrl: './link-member.component.html',
  styleUrls: ['./link-member.component.scss']
})
export class LinkMemberComponent implements OnInit {

  membersFiltered: Member[];
  reservationsFiltered: Reservation[];
  reservationsId: number[] = [];

  constructor(private httpClient: HttpClient,
              private router: Router,
              private memberService: MemberService,
              private reservationService: ReservationService,
              private attendeeService: AttendeeService,
              private adminService: AdminService) {
    this.membersFiltered=[];
    this.reservationsFiltered=[];
  }

  async ngOnInit() {
    //On recupere les reservations du membre connecte pour lesquelles il est le leader
    this.reservationService.getReservationByLeaderId(this.memberService.memberConnected.id).subscribe(reservations => this.reservationsFiltered = reservations);
    //On recupere les id des reservations du membre connecte pour lesquelles il est le participant
    this.attendeeService.getReservationIdByAttendeeId(this.memberService.memberConnected.id).subscribe(reservationsId => this.reservationsId = reservationsId);
    await new Promise(f => setTimeout(f, 500));
    if(this.reservationsId.length > 0) {
      let reservationsAttendeeFiltered: Reservation[];
      //on recupere les reservations via la liste d'id ou le membre connecte est participant
      this.reservationService.getReservationsById(this.reservationsId).subscribe(reservations => reservationsAttendeeFiltered = reservations); //changer la variable de reception
      await new Promise(f => setTimeout(f, 500));
      //on ajoute a notre liste de reservation ou il est le leader celles ou il est participant
      for (let i = 0 ; i < reservationsAttendeeFiltered.length ; i++) {
        this.reservationsFiltered.push(reservationsAttendeeFiltered[i])
      }
    }
  }

  //Decomposition de la date en jour et heure de debut et de fin pour affichage dans l'html
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
