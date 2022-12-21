package io.takima.demo;

import io.takima.demo.models.Room;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoomDAO extends CrudRepository<Room, Long> {
}
