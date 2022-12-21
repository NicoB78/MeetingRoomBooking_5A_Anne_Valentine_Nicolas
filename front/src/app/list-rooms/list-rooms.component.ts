import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RoomService} from "../services/room.service";
import {Room} from "../../models/room.model";
import { Router } from '@angular/router';
import {AdminService} from "../services/admin.service";

@Component({
  selector: 'app-list-rooms',
  templateUrl: './list-rooms.component.html',
  styleUrls: ['./list-rooms.component.scss']
})
export class ListRoomsComponent implements OnInit {

  rooms: Room[];
  constructor(private http: HttpClient, private adminService: AdminService, private roomService: RoomService, private router: Router){
    this.rooms=[];
  }

  ngOnInit() {
    this.roomService.getRooms().subscribe(rooms => this.rooms = rooms)
  }

  deleteRoom(id: number | null){
    this.roomService.deleteRoom(id).subscribe(() => this.rooms = this.rooms.filter(room => room.id !== id));
  }

  update(room: Room){
    this.roomService.roomToEdit = room;
    setTimeout(()=> this.router.navigateByUrl('/edit-room'),1000)
  }
}
