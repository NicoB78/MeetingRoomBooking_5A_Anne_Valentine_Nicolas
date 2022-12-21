import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import { Observable, Subject } from "rxjs";
import {Member} from "../../models/member.model";

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  isadmin : Subject<boolean> = new Subject();
  isAdmin:boolean;

  isNotConnexionPage : Subject<boolean> = new Subject();
  private url: string;

  constructor(private http: HttpClient) {
    this.url = environment.url;
  }
  //méthode qui en fonction des autres comp def valeur isadmin
  setAdmin(role : boolean){
    this.isadmin.next(role);
    this.isAdmin = role
  }
  setIsNotConnexionPage(value:boolean){
    this.isNotConnexionPage.next(value);
  }

}
