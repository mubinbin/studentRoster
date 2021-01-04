package com.mb.studentroster.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mb.studentroster.models.Dorm;

@Repository
public interface DormRepo extends JpaRepository<Dorm, Long> {
	
	List<Dorm> findAll();
	List<Dorm> findByAddress(String dormAddress);
	Dorm findByName(String dormName);
}
