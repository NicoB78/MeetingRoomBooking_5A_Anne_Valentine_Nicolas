import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Member} from "../../models/member.model";

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  private url: string;
  memberToEdit:Member;
  memberConnected:Member;

  constructor(private http: HttpClient) {
    this.url = environment.url;
  }

  getMembers(): Observable<Member[]> {
    return this.http.get<Member[]>(`${this.url}/members`);
  }

  addMember(member: Member): Observable<Member> {
    return this.http.post<any>(`${this.url}/members`, member);
  }

  deleteMember(id: number/*bigint*/ | null): Observable<any> {
    return this.http.delete(`${this.url}/members/${id}`);
  }

  filterByLastName(lastName: String): Observable<Member> {
    return this.http.get<Member>(`${this.url}/members/filterByLastName/${lastName}`);
  }

  getIdMembersByListLastName(listLastName: String[]): Observable<number[]> {
    return this.http.get<number[]>(`${this.url}/members/filterByListLastName/${listLastName}`);
  }
}
