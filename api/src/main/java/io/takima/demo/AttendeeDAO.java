package io.takima.demo;

import io.takima.demo.models.Attendee;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AttendeeDAO extends CrudRepository<Attendee, Long> {
}
