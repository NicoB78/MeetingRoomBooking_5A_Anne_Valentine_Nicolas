import {Component, OnInit} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {RoomService} from "../services/room.service";
import {Room} from "../../models/room.model";
import {Reservation} from "../../models/reservation.model";
import {ReservationService} from "../services/reservation.service";
import {delay, Timestamp} from "rxjs";
import {AdminService} from "../services/admin.service";

@Component({
  selector: 'app-research-room',
  templateUrl: './research-room.component.html',
  styleUrls: ['./research-room.component.scss']
})
export class ResearchRoomComponent implements OnInit {
  roomsFiltered: Room[];
  roomChosen : Room;
  roomId : Number[];
  startingTime:string;
  endingTime:string;


  constructor(private httpClient: HttpClient, private adminService: AdminService, private router: Router, private roomService: RoomService, private reservationService: ReservationService) {
    this.roomsFiltered=[];
    this.roomChosen =new Room(null,"",0,"","");
    this.roomId=[];

    this.startingTime="07:00";
    this.endingTime="20:00";

  }

  ngOnInit() {
    this.setDateMinCalendar();
  }
  onSubmit(ngForm: NgForm) {
    if(ngForm.form.value.date_reservation != "") {
      this.researchResa(ngForm)

    }
  }

  setDateMinCalendar(){
    //On empèche l'utilisateur de choisir une date qui soit déjà passé, le minimum est set sur le jour actuel
    var today = new Date();
    var dd : string = (today.getDate()).toString();
    var mm: string = (today.getMonth() + 1).toString(); //January is 0!
    var yyyy = today.getFullYear();

    if (Number(dd) < 10) {
      dd = '0' + dd;
    }

    if (Number(mm) < 10) {
      mm = '0' + mm;
    }

    var todayDate = yyyy + '-' + mm + '-' + dd;

    //Defini le minimum dans le fichier html
    var inputDate = document.getElementById("date_reservation")
    if(inputDate != null){
      inputDate.setAttribute("min", todayDate);
    }

  }

  async researchResa(ngForm : NgForm){
    //On récupère la capacité, si elle est vide, on la met à zéro par defaut
    let capacity = ngForm.form.value.capacity;
    if (capacity == "") {
      capacity = 0;
    }

    // Récupération du starting time et du ending time, si l'utilisateur n'en a pas choisi, ils seront set
    //aux horaires extrêmes (7h et 20h)
    //le starting et le ending time sont des timestamps, ils incluent donc aussi la date et pas seulement un horaire
    if (ngForm.form.value.starting_time != "") {
      this.startingTime = ngForm.form.value.starting_time;
    }
    if (ngForm.form.value.ending_time != "") {
      this.endingTime = ngForm.form.value.ending_time;
    }
    let dateReservation = ngForm.form.value.date_reservation;
    const [year, month, day] = dateReservation.split('-');
    const [hoursST, minutesST] = this.startingTime.split(':');
    const startingDate = new Date(+year, month - 1, +day, +hoursST, +minutesST);
    const startingTs = startingDate.getTime();
    const [hoursET, minutesET] = this.endingTime.split(':');
    const endingDate = new Date(+year, month - 1, +day, +hoursET, +minutesET);
    const endingTs = endingDate.getTime();


    this.reservationService.dayChosenForReservation = dateReservation;//permet de récupérer la date de la reservation dans le book room
    this.reservationService.getIdRoomAvailableByDay(startingTs, endingTs).subscribe(roomsId => this.roomId = roomsId)
    this.reservationService.getReservationbyDay(startingTs, endingTs).subscribe(reservations => this.reservationService.reservationByDay = reservations)
    await new Promise(f => setTimeout(f, 1000));//Laisse du temps pour récupérer les données
    //on récupère la liste des rooms disponibles et qui correspondent aux critères.
    this.roomService.getRoomsByListId(this.roomId, capacity).subscribe(rooms => this.roomsFiltered = rooms);
    await new Promise(f => setTimeout(f, 1000));
    await new Promise(f => setTimeout(f, 1000));

  }
  bookRoom(room:Room){
    this.roomService.roomChosenToBook = room; //permet de récupérer dans le book room la salle que l'utilisateur a choisi
    setTimeout(()=>this.router.navigateByUrl('/book_room'), 1000) //envoie vers book room
  }


}
