package com.mb.studentroster.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mb.studentroster.models.Student;

@Repository
public interface StudentRepo extends JpaRepository<Student, Long> {
	
	List<Student> findAll();
	List<Student> findByFirstName(String firstName);
	List<Student> findByLastName(String LastName);
}
