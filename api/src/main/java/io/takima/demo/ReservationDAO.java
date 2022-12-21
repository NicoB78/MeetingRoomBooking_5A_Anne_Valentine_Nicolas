package io.takima.demo;
import io.takima.demo.models.Reservation;
import io.takima.demo.models.Reservation;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReservationDAO extends CrudRepository<Reservation, Long> {
}