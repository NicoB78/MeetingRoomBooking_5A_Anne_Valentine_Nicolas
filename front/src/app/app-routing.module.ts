import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AddMemberComponent} from "./add-member/add-member.component";
import {ListMembersComponent} from "./list-members/list-members.component";
import {ConnectionComponent} from "./connection/connection.component";
import {ListRoomsComponent} from "./list-rooms/list-rooms.component";
import {AddRoomComponent} from "./add-room/add-room.component";

import { AddReservationComponent } from './add-reservation/add-reservation.component';
import { ListReservationsComponent } from './list-reservations/list-reservations.component';
import {ResearchRoomComponent} from "./research-room/research-room.component";
import { LinkMemberComponent } from './link-member/link-member.component';
import { NavbarComponent } from './navbar/navbar.component';
import {BookRoomComponent} from "./book_room/book-room.component";
import {EditMemberComponent} from "./edit-member/edit-member.component";
import {EditRoomComponent} from "./edit-room/edit-room.component";


const routes: Routes = [
  {path:'add-member', component: AddMemberComponent},
  {path:'list-members', component: ListMembersComponent},
  {path:'', component: ConnectionComponent},

  {path:'list-rooms', component: ListRoomsComponent},
  {path:'add-room', component: AddRoomComponent},

  {path:'list-reservations', component: ListReservationsComponent},
  {path:'add-reservation', component: AddReservationComponent},

  {path:'link-member', component: LinkMemberComponent},
  {path:'navbar', component: NavbarComponent},

  {path:'research-room', component: ResearchRoomComponent},
  {path:'book_room', component: BookRoomComponent},
  {path:'edit-member', component: EditMemberComponent},
  {path:'edit-room', component: EditRoomComponent},


];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
