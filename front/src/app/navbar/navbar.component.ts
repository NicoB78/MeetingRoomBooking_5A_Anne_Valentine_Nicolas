import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import { AdminService } from '../services/admin.service';
import { Observable, Subscription } from 'rxjs';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  isadmin= false;
  isNotConnexionPage=false;
  sub : Subscription | undefined;
  subConnexion: Subscription|undefined;

  constructor(private httpClient: HttpClient, private router: Router, private adminService : AdminService) {
  }

  ngOnInit() {
    this.sub = this.adminService.isadmin.subscribe((isadmin => this.isadmin = isadmin));
    this.subConnexion = this.adminService.isNotConnexionPage.subscribe((isNotConnexionPage => this.isNotConnexionPage = isNotConnexionPage))
  }
  ngOnDestroy(){
  this.sub?.unsubscribe()
    this.subConnexion?.unsubscribe()
  }
}
