package io.takima.demo.controllers;

import io.takima.demo.RoomDAO;
import io.takima.demo.models.Member;
import io.takima.demo.models.Reservation;
import io.takima.demo.models.Room;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;


@CrossOrigin
@RequestMapping("rooms")
@RestController
public class  RoomController{

    private final RoomDAO roomDAO;

    public RoomController(RoomDAO roomDAO) {
        this.roomDAO = roomDAO;
    }

    @GetMapping()
    public List<Room> listRooms() {
        return getListRoom();
    }

    @DeleteMapping("/{id}")
    public void deleteRoom(@PathVariable Long id) {
        roomDAO.deleteById(id);
    }

    @PostMapping("")
    public void addRoom(@RequestBody Room room) {
        roomDAO.save(room);
    }

    /*@GetMapping("filterRoomsAvailableByCapacity/{capacity}/{roomsFiltered}")
    public List<Room> filterByCapacity(@PathVariable Long capacity, @PathVariable List<Room> roomsFilteredByDay) {
        List<Room> filteredRooms = roomsFilteredByDay.stream().filter(room -> room.getCapacity() > capacity).collect(Collectors.toList());
        return filteredRooms ;
    }*/

    @GetMapping("/{listRoomsId}/{capacity}")
    public List<Room> listRoomsById(@PathVariable List<Long> listRoomsId, @PathVariable Long capacity) {
        return idAndCapacityRecognition(getListRoom(), listRoomsId, capacity);
    }

    private List<Room> getListRoom() {
        Iterable<Room> it = roomDAO.findAll();
        List <Room> rooms = new ArrayList<>();
        it.forEach(room -> rooms.add(room));
        return rooms;
    }

    private List<Room> idAndCapacityRecognition(List<Room> rooms, List<Long> listRoomsId, Long capacity) {
        List <Room> roomsFiltered = new ArrayList<>();
        for(int i = 0 ; i < rooms.size() ; i++) { //On parcourt nos rooms de la bdd
            for(int j = 0 ; j < listRoomsId.size() ; j++) { //On parcourt notre liste d'id de room
                //Si l'id de la salle de la bdd est la meme que celle de notre liste entrante et que la capacite est
                //respectee, alors on ajoute notre salle dans la liste de salles filtrees
                if(rooms.get(i).getId().compareTo(listRoomsId.get(j)) == 0
                        && rooms.get(i).getCapacity() >= capacity) {
                    roomsFiltered.add(rooms.get(i));
                }
            }
        }
        return roomsFiltered;
    }

    @GetMapping("/room/{id}")
    public Room getRoomById(@PathVariable Long id) {
        return roomDAO.findById(id).get();
    }

}



