import {Component, EventEmitter, OnInit, Output} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import { Observable } from "rxjs";
import { Member } from "src/models/member.model";
import { MemberService } from "../services/member.service";
import { AdminService } from "../services/admin.service";


@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.scss']
})
export class ConnectionComponent implements OnInit {
  pseudo=false;
  http: any;
   @Output()
  isadmin = new EventEmitter<boolean>();

  constructor(private httpClient: HttpClient, private router: Router, private memberService : MemberService, private adminService : AdminService) {
  }

  ngOnInit() {
    this.adminService.setIsNotConnexionPage(false)
  }

  async onSubmit(ngForm: NgForm) {
    if(ngForm.form.value.sign_in == "root"){
      this.adminService.setAdmin(true);
      this.adminService.setIsNotConnexionPage(true)
      this.adminService.setIsNotConnexionPage(true)
      setTimeout(()=>this.router.navigateByUrl('/list-members'), 1000)
    }

    else if(ngForm.form.value.sign_in != ""){
      this.adminService.setAdmin(false);
      this.adminService.setIsNotConnexionPage(true)
      let lastName = ngForm.form.value.sign_in;
      this.memberService.filterByLastName(String(lastName)).subscribe(member => this.memberService.memberConnected = member)
      await new Promise(f => setTimeout(f, 500));
      if(this.memberService.memberConnected != null) {
        this.adminService.setIsNotConnexionPage(true)
        setTimeout(() => this.router.navigateByUrl('/link-member'), 1000)
      }
    }

  }
}





