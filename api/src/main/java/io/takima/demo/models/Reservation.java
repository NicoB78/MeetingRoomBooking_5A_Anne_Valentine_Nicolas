package io.takima.demo.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.sql.Timestamp;
import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Comparator;
import java.util.List;
import java.util.Objects;
import javax.persistence.Entity;
import javax.persistence.Table;

    @Entity
    @Table(name = "reservations")
    public class Reservation {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Column(name = "id_reservations")
        private Long id;

        @Column(name = "debut")
        private Timestamp debut;
        @Column(name = "fin")
        private Timestamp fin;

        @Column(name = "id_leader")
        private Long idLeader;

        @Column(name = "id_room")
        private Long idRoom;

        public Reservation() {
        }
        //communiquer java/sql

        public Reservation(Long id, Timestamp debut, Timestamp fin, Long idLeader, Long idRoom) {
            this.id = id;
            this.debut = debut;
            this.fin = fin;
            this.idLeader = idLeader;
            this.idRoom = idRoom;
        }

        public Long getId() {
            return id;
        }

        public Long getIdRoom() {
            return idRoom;
        }

        public void setIdRoom(Long idRoom) {
            this.idRoom = idRoom;
        }

        public Long getIdLeader() {
            return idLeader;
        }

        public void setIdLeader(Long idLeader) {
            this.idLeader = idLeader;
        }

        public Timestamp getDebut() {
            return debut;
        }

        public Timestamp getFin() {
            return fin;
        }

        public void setId(Long id) {
            this.id = id;
        }


        public void setDebut(Timestamp debut) {
            this.debut = debut;
        }

        public void setFin(Timestamp fin) {
            this.fin = fin;
        }


    }
//recreer une interface member selon Anne enum classe ??
