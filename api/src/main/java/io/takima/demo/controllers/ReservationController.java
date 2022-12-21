package io.takima.demo.controllers;

import io.takima.demo.ReservationDAO;
import io.takima.demo.RoomDAO;
import io.takima.demo.models.Reservation;
import io.takima.demo.models.Room;
import org.springframework.web.bind.annotation.*;

import java.io.Console;
import java.sql.Timestamp;
import java.util.*;
import java.util.stream.Collectors;

@CrossOrigin
@RequestMapping("reservations")
@RestController
public class ReservationController{

    private final ReservationDAO reservationDAO;
    private final RoomDAO roomDAO;

    public ReservationController(ReservationDAO reservationDAO, RoomDAO roomDAO) {

        this.reservationDAO = reservationDAO;
        this.roomDAO = roomDAO;
    }

    //Classe statique pour trier les reservations par ordre de room id
    static class SortByIdRoom implements Comparator<Reservation> {
        @Override
        public int compare(Reservation o1, Reservation o2) {
            return o1.getIdRoom().compareTo(o2.getIdRoom());
        }
    }

    //Classe statique pour trier les reservations par date
    static class SortByDate implements Comparator<Reservation> {
        @Override
        public int compare(Reservation o1, Reservation o2) {
            return o1.getDebut().compareTo(o2.getDebut());
        }
    }

    @GetMapping("")
    public List<Reservation> listReservations() {
        return getListReservation();
    }

    @GetMapping("/{id}")
    public List<Reservation> listReservationsByLeaderId(@PathVariable Long id) {
        List<Reservation> listByLeaderId = new ArrayList<>();
        listByLeaderId = getListReservation().stream().filter(reservation -> Objects.equals(reservation.getIdLeader(), id)).collect(Collectors.toList());
        return listByLeaderId;
    }

    @GetMapping("/idLastReservation")
    public Long idLastReservation() {
        List<Reservation> reservations = new ArrayList<>();
        reservations = getListReservation();
        if(reservations.size() == 0) {
            return 1L;
        }
        else {
            return reservations.get(reservations.size() - 1).getId(); //Recupere l'id de la derniere reservation
        }
    }

    @GetMapping("/listReservationsById/{idReservations}")
    public List<Reservation> getListReservationsById(@PathVariable List<Long> idReservations) {
        List<Reservation> reservations = getListReservation();
        List<Reservation> listById = new ArrayList<>();
        for(int i = 0; i < reservations.size() ; i++) {
            for(int j = 0 ; j < idReservations.size() ; j++) {
                if(reservations.get(i).getId().compareTo(idReservations.get(j)) == 0) {
                    listById.add(reservations.get(i));
                }
            }
        }
        return listById;
    }

    @GetMapping("filterByDay/{startingTs}/{endingTs}")
    public List<Reservation> listReservationsByDay(@PathVariable Long startingTs, @PathVariable Long endingTs) {
        return getListReservationByDay(startingTs, endingTs);
    }

    @GetMapping("filterByRoom/{startingTs}/{endingTs}")
    public List<Long> listIdRoomsAvailableByDay(@PathVariable Long startingTs, @PathVariable Long endingTs) {
        List<Reservation> filteredReservations = getListReservationByDay(startingTs, endingTs);
        //On trie nos reservations par room id et par date
        filteredReservations = sortReservation(filteredReservations);
        //On renvoie notre liste d'id de salles correspondant aux salles qui n'ont pas de reservation de la journee
        //ainsi que des salles qui ont des reservations mais dont il reste du temps disponible
        return addingRoomWithoutReservationForTheDay(removeRoomFromFilteredReservation(filteredReservations),
                getRoomAvailableFromFilteredReservations(filteredReservations));
    }

    @DeleteMapping("/{id}")
    public void deleteReservation(@PathVariable Long id) {
        reservationDAO.deleteById(id);
    }

    @PostMapping("")
    public void addReservation(@RequestBody Reservation reservation) {
        System.out.println(reservation);
        reservationDAO.save(reservation);
    }

    private List<Reservation> getListReservation() {
        Iterable<Reservation> it = reservationDAO.findAll();
        List <Reservation> reservations = new ArrayList<>();
        it.forEach(reservation -> reservations.add(reservation));
        return reservations;
    }

    private List<Room> getListRoom() {
        Iterable<Room> it = roomDAO.findAll();
        List <Room> rooms = new ArrayList<>();
        it.forEach(room -> rooms.add(room));
        return rooms;
    }

    private Date longToDate(Long longDate){
        return new Date(longDate);
    }

    private List<Reservation> getListReservationByDay(Long startingTs, Long endingTs) {
        //On veut la liste des reservations de la journee donc on cherche dans les reservations de la bdd celles dont
        //la date de depart et de fin sont comprises entre le debut et la fin des dates entrantes de la fonction
        List<Reservation> filteredReservations = getListReservation().stream().filter(reservation -> reservation.getDebut().after(longToDate(startingTs))
                && reservation.getFin().before(longToDate(endingTs))).collect(Collectors.toList());
        return filteredReservations;
    }

    private List<Reservation> sortReservation(List<Reservation> filteredReservations) {
        Collections.sort(filteredReservations, new SortByDate());
        Collections.sort(filteredReservations, new SortByIdRoom());
        return filteredReservations;
    }

    private List<Long> getRoomAvailableFromFilteredReservations(List<Reservation> filteredReservations) {
        List <Long> availableRoomsId  = new ArrayList<>();
        int count = 0;
        for(int i = 1 ; i < filteredReservations.size() ; i++) {
            count += 1;
            //La fin de la reservation precedente est différente du debut de la reservation suivante donc il y a du
            //temps disponible entre les deux
            if(!(filteredReservations.get(i-1).getFin().equals(filteredReservations.get(i).getDebut()))
                    //On ne veut comparer que les reservations d une meme salle
                    && filteredReservations.get(i-1).getIdRoom().compareTo(filteredReservations.get(i).getIdRoom()) == 0
                    //On empeche les doublons
                    && availableRoomsId.get(availableRoomsId.size()-1).compareTo(filteredReservations.get(i-1).getIdRoom()) != 0
            )
            {
                availableRoomsId.add(filteredReservations.get(i-1).getIdRoom());
                //Notre premiere condition ne gere pas qu'une salle puisse avoir une unique reservation et du coup etre disponible
            }
            //Si on change d'id de room alors que le compteur est egal a 1, on considere que la salle est dispo dans la journee
            if (filteredReservations.get(i-1).getIdRoom().compareTo(filteredReservations.get(i).getIdRoom()) != 0) {
                if(count == 1) {
                    availableRoomsId.add(filteredReservations.get(i-1).getIdRoom());
                }
                //Remise à 0 du compteur
                count = 0;
            }
            //Gestion de la derniere reservation si elle a un id different de l'avant derniere, elle n'a qu'une seule
            //reservation et est donc disponible
            if(i == filteredReservations.size()-1
                    && filteredReservations.get(i-1).getIdRoom().compareTo(filteredReservations.get(i).getIdRoom()) != 0){
                availableRoomsId.add(filteredReservations.get(i).getIdRoom());
            }
        }
        //Gestion du cas où il n'y a qu'une seule reservation dans notre liste, la salle associee est dispo
        if(filteredReservations.size() == 1){
            availableRoomsId.add(filteredReservations.get(0).getIdRoom());
        }
        return availableRoomsId;
    }

    private List<Room> removeRoomFromFilteredReservation (List<Reservation> filteredReservations) {
        //On enleve ici les salles qui ont deja été traitées
        List <Room> rooms = getListRoom();
        for (int i = 0 ; i < filteredReservations.size() ; i++) {
            for (int j = 0 ; j < rooms.size() ; j ++) {
                if(filteredReservations.get(i).getIdRoom().compareTo(rooms.get(j).getId()) == 0) {
                    rooms.remove(j);
                }
            }
        }
        return rooms;
    }

    private List<Long> addingRoomWithoutReservationForTheDay (List<Room> rooms, List<Long> availableRoomsId) {
        //Maintenant que les salles qui ont deja ete traitees sont enlevees, il nous reste les salles qui
        //n'ont pas de reservation de la journee donc qui sont libres
        //On les ajoute a notre liste de salle dispo
        for (int j = 0 ; j < rooms.size() ; j ++) {
            availableRoomsId.add(rooms.get(j).getId());
        }
        return availableRoomsId;
    }

    /*@GetMapping("/reservation/{id}")
    public Reservation getReservationById(@PathVariable Long id) { return reservationDAO.findById(id).get();
    }*/

}

