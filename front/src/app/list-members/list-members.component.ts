import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MemberService} from "../services/member.service";
import {Member} from "../../models/member.model";
import {ActivatedRoute, Router} from "@angular/router";
import {Timestamp} from "rxjs";
import {AdminService} from "../services/admin.service";


@Component({
  selector: 'app-list-members',
  templateUrl: './list-members.component.html',
  styleUrls: ['./list-members.component.scss']
})
export class ListMembersComponent implements OnInit {

  members: Member[];

  dateString: string;
  constructor(private http: HttpClient, private adminService: AdminService, private memberService: MemberService, private activatedrouter: ActivatedRoute, private router: Router) {
    this.members=[];
    this.dateString="";
  }

  ngOnInit() {
    this.memberService.getMembers().subscribe(members => this.members = members)

  }

  deleteMember(id: number | null){
    this.memberService.deleteMember(id).subscribe(() => this.members = this.members.filter(member => member.id !== id));
  }


  update(member: Member){
    this.memberService.memberToEdit = member;

    setTimeout(() => this.router.navigateByUrl('/edit-member'), 1000)
  }

  Date(birthDate: Date,id) {
    var date = new Date(birthDate)
    var dateForHTML = date.getFullYear()+"/"+(date.getMonth()+1)+"/"+date.getDate()

    var dateText = document.getElementById("birth_date"+id)
    if(dateText != null){
      dateText.textContent = dateForHTML;
    }
  }
}
