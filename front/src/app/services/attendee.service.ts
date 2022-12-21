import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Member} from "../../models/member.model";
import {Attendee} from "../../models/attendee.model";

@Injectable({
  providedIn: 'root'
})
export class AttendeeService {
  private url: string;

  constructor(private http: HttpClient) {
    this.url = environment.url;
  }

  getAttendees(): Observable<Attendee[]> {
    return this.http.get<Attendee[]>(`${this.url}/attendees`);
  }

  addAttendee(attendee: Attendee): Observable<Attendee> {
    return this.http.post<any>(`${this.url}/attendees`, attendee);
  }

  deleteAttendee(id: number | null): Observable<any> {
    return this.http.delete(`${this.url}/attendees/${id}`);
  }

  getReservationIdByAttendeeId(idAttendee: number): Observable<number[]> {
    return this.http.get<number[]>(`${this.url}/attendees/${idAttendee}`);
  }

}
