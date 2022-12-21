import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {RoomService} from "../services/room.service";
import {Room} from "../../models/room.model";
import {ReservationService} from "../services/reservation.service";

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.scss']
})
export class AddRoomComponent implements OnInit {

  pictureName : string;

  constructor(private httpClient: HttpClient, private router: Router, private roomService: RoomService, private resrevationService:ReservationService) {
    this.pictureName ="";
  }

  ngOnInit() {
  }

  onSubmit(ngForm: NgForm) {
      const room = new Room(
        null,
        ngForm.form.value.name,
        ngForm.form.value.capacity,
        ngForm.form.value.equipment,
        this.pictureName,
      )
      this.roomService.addRoom(room).subscribe();
      setTimeout(()=>this.router.navigateByUrl('/list-rooms'), 1000)
  }


  imageOnClick(pictureName : String){

    var amphiPicture = document.getElementById("amphi_picture")
    if(amphiPicture != null){
      amphiPicture.style.width = "150px";
      amphiPicture.style.height = "90px";
    }

    var roomPicture = document.getElementById("room_picture")
    if(roomPicture != null){
      roomPicture.style.width = "150px";
      roomPicture.style.height = "90px";
    }

    var computerPicture = document.getElementById("computer_picture")
    if(computerPicture != null){
      computerPicture.style.width = "150px";
      computerPicture.style.height = "90px";
    }

    if(pictureName ==="amphi.png" && amphiPicture != null){
      amphiPicture.style.width = "200px";
      amphiPicture.style.height = "110px";
      this.pictureName = "amphi.png"
    }
    else if(pictureName === "computer.jpg" && computerPicture != null){
      computerPicture.style.width = "200px";
      computerPicture.style.height = "110px";
      this.pictureName = "computer.jpg"
    }
    else if(pictureName === "room.jpg" && roomPicture != null){
      roomPicture.style.width = "200px";
      roomPicture.style.height = "110px";
      this.pictureName = "room.jpg"
    }


  }
}
