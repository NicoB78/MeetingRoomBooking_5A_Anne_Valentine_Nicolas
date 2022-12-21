
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Room} from "../../models/room.model";
import {Reservation} from "../../models/reservation.model";
import {Member} from "../../models/member.model";

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private url: string;
  roomChosenToBook:Room;
  roomToEdit: Room;

  constructor(private http: HttpClient) {
    this.url = environment.url;
  }

  getRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(`${this.url}/rooms`);
  }

  addRoom(room: Room): Observable<Room> {
    return this.http.post<any>(`${this.url}/rooms`, room);
  }

  deleteRoom(id: number | null): Observable<any> {
    return this.http.delete(`${this.url}/rooms/${id}`);
  }

  getRoomsByListId(listRoomsId : Number[], capacity : Number): Observable<Room[]> {
    return this.http.get<Room[]>(`${this.url}/rooms/${listRoomsId}/${capacity}`);
  }

  getRoomById(id: number | null): Observable<Room> {
    console.log('id : ', id)
    return this.http.get<Room>(`${this.url}/rooms/${id}`);
  }
}
