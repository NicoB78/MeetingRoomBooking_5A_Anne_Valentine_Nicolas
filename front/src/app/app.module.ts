import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { AddReservationComponent } from './add-reservation/add-reservation.component';
import { ListReservationsComponent } from './list-reservations/list-reservations.component';
import {FormsModule} from "@angular/forms";
import {AddMemberComponent} from "./add-member/add-member.component";
import {ListMembersComponent} from "./list-members/list-members.component";
import {AddRoomComponent} from "./add-room/add-room.component";
import {ListRoomsComponent} from "./list-rooms/list-rooms.component";
import {AppPublicComponent} from "./app-public/app-public.component";
import {ConnectionComponent} from "./connection/connection.component";
import {ResearchRoomComponent} from "./research-room/research-room.component";
import { LinkMemberComponent } from './link-member/link-member.component';
import {NavbarComponent} from './navbar/navbar.component'
import {BookRoomComponent} from "./book_room/book-room.component";
import {EditMemberComponent} from "./edit-member/edit-member.component";
import {EditRoomComponent} from "./edit-room/edit-room.component";

@NgModule({
  declarations: [
    AppComponent,
    ConnectionComponent,
    AddMemberComponent,
    ListMembersComponent,
    AddRoomComponent,
    ListRoomsComponent,
    AppPublicComponent,
    AddReservationComponent,
    ListReservationsComponent,
    ResearchRoomComponent,
    LinkMemberComponent,
    NavbarComponent,
    BookRoomComponent,
    EditMemberComponent,
    EditRoomComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
