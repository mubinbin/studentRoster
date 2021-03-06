package com.mb.studentroster.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mb.studentroster.models.Contactinfo;
import com.mb.studentroster.models.Student;

@Repository
public interface ContactinfoRepo extends JpaRepository<Contactinfo, Long>{
	
	List<Contactinfo> findAll();
	Contactinfo findByStudent(Student s);
}
