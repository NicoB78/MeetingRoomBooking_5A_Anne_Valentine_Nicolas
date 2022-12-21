package io.takima.demo.controllers;

import io.takima.demo.MemberDAO;
import io.takima.demo.models.Member;
import io.takima.demo.models.Reservation;
import io.takima.demo.models.Room;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@CrossOrigin
@RequestMapping("members")
@RestController
public class MemberController {
    private final MemberDAO memberDAO;

    public MemberController(MemberDAO memberDAO) {
        this.memberDAO = memberDAO;
    }

    @GetMapping("")
    public List<Member> listMembers() {
        Iterable<Member> it = memberDAO.findAll();
        List<Member> members = new ArrayList<>();
        it.forEach(member -> members.add(member));
        return members;
    }

    @DeleteMapping("/{id}")
    public void deleteMember(@PathVariable Long id) {
        memberDAO.deleteById(id);
    }

    @PostMapping("")
    public void addMember(@RequestBody Member member) {
        memberDAO.save(member);
    }

    @GetMapping("/filterByListLastName/{listLastName}")
    public List<Long> getIdMembersByListLastName (@PathVariable List<String> listLastName) {
        Iterable<Member> it = memberDAO.findAll();
        List <Member> members = new ArrayList<>();
        it.forEach(member -> members.add(member));
        List<Long> listIdAttendee = new ArrayList<>();
        for(int i = 0 ; i < members.size(); i++) {
            for(int j = 0 ; j < listLastName.size() ; j++) {
                if(members.get(i).getLastName().equals(listLastName.get(j))) {
                    listIdAttendee.add(members.get(i).getId());
                }
            }
        }
        return listIdAttendee;
    }

    @GetMapping("/filterByLastName/{lastName}")
    public Member getMemberByLastName (@PathVariable String lastName) {
        Iterable<Member> it = memberDAO.findAll();
        List <Member> members = new ArrayList<>();
        it.forEach(member -> members.add(member));
        for(int i = 0 ; i < members.size(); i++) {
            if(members.get(i).getLastName().equals(lastName)) {
                return members.get(i);
            }
        }
        return null;
    }

    @GetMapping("/{id}")
    public Member getMemberById(@PathVariable Long id) {
        return memberDAO.findById(id).get();
    }

}
