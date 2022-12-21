package io.takima.demo.controllers;


import io.takima.demo.AttendeeDAO;
import io.takima.demo.ReservationDAO;
import io.takima.demo.models.Attendee;
import io.takima.demo.models.Reservation;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin
@RequestMapping("attendees")
@RestController
public class AttendeeController {
    private final AttendeeDAO attendeeDAO;

    public AttendeeController(AttendeeDAO attendeeDAO) {
        this.attendeeDAO = attendeeDAO;
    }

    @GetMapping("")
    public List<Attendee> listAttendees() {
        Iterable<Attendee> it = attendeeDAO.findAll();
        List <Attendee> attendees = new ArrayList<>();
        it.forEach(attendee -> attendees.add(attendee));
        return attendees ;
    }


    @DeleteMapping("/{id}")
    public void deleteAttendee(@PathVariable Long id) {
        attendeeDAO.deleteById(id);
    }

    @PostMapping("")
    public void addAttendee(@RequestBody Attendee attendee) {
        System.out.println(attendee);
        attendeeDAO.save(attendee);
    }

    @GetMapping("/{idAttendee}")
    public List<Long> listIdReservationFromIdAttendee(@PathVariable Long idAttendee) {
        Iterable<Attendee> it = attendeeDAO.findAll();
        List <Attendee> attendees = new ArrayList<>();
        it.forEach(attendee -> attendees.add(attendee));
        List<Long> listIdReservation = new ArrayList<>();
        for(int i = 0 ; i < attendees.size() ; i++) {
            if(attendees.get(i).getIdMember().compareTo(idAttendee) == 0) {
                listIdReservation.add(attendees.get(i).getIdReservation());
            }
        }
        return listIdReservation;
    }
}
