package io.takima.demo.models;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "rooms")
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_rooms")
    private Long id;
    @Column(name = "name")
    private String name;

    @Column(name = "capacity")
    private Long capacity;

    @Column(name = "equipment")
    private String equipment;
    @Column(name = "picture")
    private String picture;

    public Room(){
    }

    public Room(Long id, String name, Long capacity, String equipment, String picture) {
        this.id = id;
        this.name = name;
        this.capacity = capacity;
        this.equipment = equipment;
        this.picture = picture;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getCapacity() {
        return capacity;
    }

    public void setCapacity(Long capacity) {
        this.capacity = capacity;
    }

    public String getEquipment() {
        return equipment;
    }

    public void setEquipment(String equipment) {
        this.equipment = equipment;
    }

    public String getPicture() {
        return picture;
    }

    public void setPicture(String picture) {
        this.picture = picture;
    }

    @Override
    public String toString() {
        return "Room{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", capacity=" + capacity +
                ", equipment=" + equipment +
                ", picture=" + picture +
                '}';
    }
}
