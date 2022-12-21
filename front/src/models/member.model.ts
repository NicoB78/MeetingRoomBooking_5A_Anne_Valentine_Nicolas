import {Timestamp} from "rxjs";

export class Member {
  id: number | null;
  firstName: string;
  lastName: string;
  mail: string;
  birthDate: Date;

  constructor(id: number | null, firstName: string, lastName: string, mail: string, birthDate: Date) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.mail = mail;
    this.birthDate = birthDate;
  }

}
