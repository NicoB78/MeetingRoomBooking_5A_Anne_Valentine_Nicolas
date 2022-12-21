import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";

import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Room} from "../../models/room.model";
import {Member} from "../../models/member.model";
import {MemberService} from "../services/member.service";
import {Reservation} from "../../models/reservation.model";
import {RoomService} from "../services/room.service";
import {ReservationService} from "../services/reservation.service";
import {Attendee} from "../../models/attendee.model";
import {AttendeeService} from "../services/attendee.service";
import {AdminService} from "../services/admin.service";

@Component({
  selector: 'app-add-reservation',
  templateUrl: './book-room.component.html',
  styleUrls: ['./book-room.component.scss']
})
export class BookRoomComponent implements OnInit {
  members: Member[];
  resaByDayForTheRoomChosen: Reservation[]
  date:string;
  roomChosen:Room;
  startingTimeListForHTML:TimeInterface[];
  endingTimeListForHTML:TimeInterface[];
  listAttendeesId: number[];
  idLastReservation: number;
  isAdmin:boolean;

  attendesLastName:string[];
  idLeader:number;
//Page qui permet de réserver une salle mais aussi d'afficher son planning pour le jour choisi dans research room

  constructor(private httpClient: HttpClient, private router: Router,
              private reservationService:ReservationService ,
              private roomService:RoomService,
              private memberService: MemberService,
              private attendeeService: AttendeeService,
              private adminService: AdminService) {
    this.listAttendeesId=[];
    this.idLastReservation;

  }

  ngOnInit() {
    this.isAdmin = this.adminService.isAdmin
    this.getMembers()
    //On affiche les informations relatif à la salle
    this.roomChosen = this.roomService.roomChosenToBook; // récupération de la salle choisit dans le research room
    this.resaByDayForTheRoomChosen =[]; //clear the list
    this.attendesLastName=[] //clear the list
    this.sortListByRoom(this.reservationService.reservationByDay); // récupère les réseravtions pour la salle le jour choisi
    this.setDateOnPage(); //Set la date choisi
    this.setNameRoomOnPage();// Set le name de la salle
    this.setPictureOnPage();//set l'image de la salle
    this.getTimeList(this.resaByDayForTheRoomChosen)// Créer les deux listes avec seulement les disponibilités de la salle
  }

  onSubmit(ngForm: NgForm) {
    if(this.isAdmin){
      this.idLeader = ngForm.form.value.leader_id
    }
    else {
      this.idLeader = this.memberService.memberConnected.id;
    }
    //Récupération des participants
      this.getAttendes()
    //Enregistrement de la réservation
      this.saveReservation(ngForm.form.value.starting_time, ngForm.form.value.ending_time)
    //Envoie des noms de famille à la data base
      this.sendLastNamesToDataBase();

    setTimeout(()=>this.router.navigateByUrl('/list-reservations'), 1000)
  }

  async getMembers(){
    //Pour le choix des participants
    this.memberService.getMembers().subscribe(members => this.members = members)
    await new Promise(f => setTimeout(f, 1000));
    for(let i= 0; i<this.members.length; i++){
      if(this.idLeader == this.members[i].id && this.isAdmin==false){
        this.members.splice(i,1);
      }
    }
  }

  setDateOnPage(){
    //Set la date choisi par l'utilisateur dans le research room, la valeur a été stockée dans reservation service
    var dateText = document.getElementById("date_reservation")
    if(dateText != null){
      dateText.textContent = this.reservationService.dayChosenForReservation.toString()
    }
  }
  setNameRoomOnPage(){
    //Set le nom de la salle choisi
    var name = document.getElementById("room_chosen")
    if(name != null){
      name.textContent = this.roomChosen.name;
    }
  }
  setPictureOnPage(){
    //Set l'image de la salle choisi
    var picture = document.getElementById("picture") as HTMLImageElement
    if(picture != null){
      picture.src="assets/Picture/" + this.roomChosen.picture;
    }
  }
  sortListByRoom(resaForTheDayForAllRoom:Reservation[]){ //get the list for the chosen room
    for(let i= 0; i<resaForTheDayForAllRoom.length;i++){
      if(resaForTheDayForAllRoom[i].idRoom = this.roomChosen.id){
        this.resaByDayForTheRoomChosen.push(resaForTheDayForAllRoom[i])
      }
    }
  }


  getTimeList(resaForTheDayForTheRoom:Reservation[]){

    //Permet de créer les deux listes pour le choix du starting et du ending time
    //On créé deux listes et ensuite on enlève les moments ou la salle n'est pas libre
    let startingTimeList:TimeInterface[] = [];
    startingTimeList = [
      { value: '07:00',time:7},
      { value: '08:00',time:8},
      { value: '09:00',time:9},
      { value: '10:00',time:10},
      { value: '11:00',time:11},
      { value: '12:00',time:12},
      { value: '13:00',time:13},
      { value: '14:00',time:14},
      { value: '15:00',time:15},
      { value: '16:00',time:16},
      { value: '17:00',time:17},
      { value: '18:00',time:18},
      { value: '19:00',time:19},
    ];

    let endingTimeList:TimeInterface[] = [];
    endingTimeList = [
      { value: '08:00',time:8},
      { value: '09:00',time:9},
      { value: '10:00',time:10},
      { value: '11:00',time:11},
      { value: '12:00',time:12},
      { value: '13:00',time:13},
      { value: '14:00',time:14},
      { value: '15:00',time:15},
      { value: '16:00',time:16},
      { value: '17:00',time:17},
      { value: '18:00',time:18},
      { value: '19:00',time:19},
      { value: '20:00',time:20},

    ];
    for(let i=0; i<resaForTheDayForTheRoom.length;i++){ //Création
      var startingTime = new Date(resaForTheDayForTheRoom[i].debut).getHours()
      var endingTime = new Date(resaForTheDayForTheRoom[i].fin).getHours()
      startingTime=15
      endingTime=17

      var amountOfHoursForReservation =  endingTime - startingTime

      let index = -1;

      //On cherche la position ou la salle n'est plus dispo avec le starting time de la reservation
      for(let j=0;j<startingTimeList.length;j++) {

        if (startingTimeList[j].time === startingTime) {
          index = j;
        }
      }

      if (index !== -1) { //on enlève tous les horaires
        for(let k=0; k<amountOfHoursForReservation;k++){
          startingTimeList.splice(index, 1);
          endingTimeList.splice(index,1)//la position est la même pour le ending time
        }
      }
    }
    this.startingTimeListForHTML = startingTimeList
    this.endingTimeListForHTML = endingTimeList

  }

  private getAttendes() {
    //récupère la liste des participants choisis par le leader
    for(let i=0; i<this.members.length;i++){
      var checkbox = document.getElementById("checkbox"+this.members[i].id) as HTMLInputElement
      if(checkbox != null){
        if(checkbox.checked===true){
          this.attendesLastName.push(this.members[i].lastName)
        }
      }

    }
  }

  private saveReservation(sT:string,eT:string) {
    //Enregistre la réservation dans la base de données et enregistre aussi les attendes
    //Premièrement, on récupère le strating et le ending time choisis
    let dateChosen = new Date(this.reservationService.dayChosenForReservation)
    const year = dateChosen.getFullYear();
    const month = dateChosen.getMonth();
    const day = dateChosen.getDate()

    //Starting time
    const [hoursST, minutesST] = sT.split(':');
    const startingDate = new Date(+year, month , +day, +hoursST,+minutesST);

    //Ending time
    const [hoursET, minutesET] = eT.split(':');
    const endingDate = new Date(+year, month, +day, +hoursET, +minutesET);

    //Création de la reservation avec les informations associées
    var reservation:Reservation = new Reservation(null,startingDate,endingDate,this.idLeader,this.roomChosen.id);

    //Ajout de la reservation à la table
    this.reservationService.addReservation(reservation).subscribe()
  }

  async sendLastNamesToDataBase(){
    this.memberService.getIdMembersByListLastName(this.attendesLastName).subscribe(ids => this.listAttendeesId = ids)
    this.reservationService.getIdLastReservation().subscribe(id => this.idLastReservation = id)
    await new Promise(f => setTimeout(f, 1000));

    for (let i = 0; i < this.listAttendeesId.length ; i++) {
      let attendee = new Attendee(null,
        this.listAttendeesId[i],
        this.idLastReservation);
      this.attendeeService.addAttendee(attendee).subscribe();
    }

  }



  DateReservation(debut: Date, fin:Date, id: number) {
    //Pour l'affichage de la liste des réseravtions de la salle
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


interface TimeInterface {
  //création d'une interface pour la liste des starting et ending time
  value: string;
  time: number;
}

