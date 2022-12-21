import {NgForm} from "@angular/forms";
import {Component, OnInit} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {Room} from "../../models/room.model";
import {RoomService} from "../services/room.service";


@Component({
  selector: 'app-edit-room',
  templateUrl: './edit-room.component.html',
  styleUrls: ['./edit-room.component.scss']
})
export class EditRoomComponent implements OnInit {

  id: number;
  room: Room | undefined


  constructor(private httpClient: HttpClient, private activatedrouter: ActivatedRoute, private roomService: RoomService, private router: Router) {
    this.id = 0
  }

  ngOnInit() {
    this.room = this.roomService.roomToEdit
  }

  async onSubmit(ngForm: NgForm) {

    const newRoom = new Room(
      this.room.id,
      this.isInputEmpty(ngForm.form.value.name, this.room.name),
      this.isCapacityInputEmpty(ngForm.form.value.capacity, this.room.capacity),
      this.isInputEmpty(ngForm.form.value.equipment, this.room.equipment),
      this.room.picture
    )

    this.roomService.deleteRoom(newRoom.id).subscribe();
    await new Promise(f => setTimeout(f, 500));
    this.roomService.addRoom(newRoom).subscribe();
    setTimeout(() => this.router.navigateByUrl('/list-rooms'), 1000)
  }

  isInputEmpty(input: string, oldMemberAttribute : string) {
    if(input == "") {
      return oldMemberAttribute;
    }
    else return input;
  }

  isCapacityInputEmpty(input: number, oldMemberAttribute : number) {
    if(String(input) == "") {
      return oldMemberAttribute;
    }
    else return input;
  }
}
