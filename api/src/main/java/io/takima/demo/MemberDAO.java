package io.takima.demo;

import io.takima.demo.models.Member;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberDAO extends CrudRepository<Member, Long> {
}
