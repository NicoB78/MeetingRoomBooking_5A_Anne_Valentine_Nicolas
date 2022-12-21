import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {Member} from "../../models/member.model";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {MemberService} from "../services/member.service";

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.scss']
})
export class AddMemberComponent implements OnInit {

  constructor(private httpClient: HttpClient, private router: Router, private memberService: MemberService) {
  }

  ngOnInit() {
  }

  onSubmit(ngForm: NgForm) {
    const member = new Member(
      null,
      ngForm.form.value.firstName,
      ngForm.form.value.lastName,
      ngForm.form.value.mail,
      ngForm.form.value.birthDate,
    )

    this.memberService.addMember(member).subscribe();
    setTimeout(()=>this.router.navigateByUrl('/list-members'), 1000)
  }
}
