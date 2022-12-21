package io.takima.demo.models;

import javax.persistence.*;

@Entity
@Table(name = "attendees")
public class Attendee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_attendees")
    private Long id;

    @Column(name = "id_member")
    private Long idMember;
    @Column(name = "id_reservation")
    private Long idReservation;

    public Attendee() {
    }

    public Attendee(Long id, Long idMember, Long idReservation) {
        this.id = id;
        this.idMember = idMember;
        this.idReservation = idReservation;
    }

    public Long getId() {
        return id;
    }

    public Long getIdMember() {
        return idMember;
    }

    public Long getIdReservation() {
        return idReservation;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setIdMember(Long idMember) {
        this.idMember = idMember;
    }

    public void setIdReservation(Long idReservation) {
        this.idReservation = idReservation;
    }
}
