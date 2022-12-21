import {NgForm} from "@angular/forms";
import {Component, OnInit} from "@angular/core";
import {Member} from "../../models/member.model";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {MemberService} from "../services/member.service";
import {AdminService} from "../services/admin.service";



@Component({
  selector: 'app-edit-member',
  templateUrl: './edit-member.component.html',
  styleUrls: ['./edit-member.component.scss']
})
export class EditMemberComponent implements OnInit {

  id: number;
  member: Member | undefined


  constructor(private httpClient: HttpClient, private adminService: AdminService, private activatedrouter: ActivatedRoute, private memberService: MemberService, private router: Router) {
    this.id = 0
  }


  ngOnInit() {
    this.member = this.memberService.memberToEdit;
  }

  async onSubmit(ngForm: NgForm) {

    var modifiedBirthDate = new Date(ngForm.form.value.birthDate);
    const newMember = new Member(
      this.member.id,
      this.isInputEmpty(ngForm.form.value.firstName, this.member.firstName),
      this.isInputEmpty(ngForm.form.value.lastName, this.member.lastName),
      this.isInputEmpty(ngForm.form.value.mail, this.member.mail),
      this.isDateInputEmpty(modifiedBirthDate, this.member.birthDate, ngForm)
    )

    this.memberService.deleteMember(newMember.id).subscribe();
    await new Promise(f => setTimeout(f, 500));
    this.memberService.addMember(newMember).subscribe();
    setTimeout(() => this.router.navigateByUrl('/list-members'), 1000)
  }

  isInputEmpty(input: string, oldMemberAttribute : string) {
    if(input == "") {
      return oldMemberAttribute;
    }
    else return input;
  }

  isDateInputEmpty(input: Date, oldMemberAttribute : Date, ngForm : NgForm) {
    if(String(input) == "Invalid Date") {
      return oldMemberAttribute;
    }
    else return ngForm.form.value.birthDate;
  }
}
