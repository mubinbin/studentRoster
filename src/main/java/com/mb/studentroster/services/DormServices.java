package com.mb.studentroster.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.mb.studentroster.models.Dorm;
import com.mb.studentroster.repositories.DormRepo;

@Service
public class DormServices {

	private final DormRepo dormRepo;
	
	public DormServices(DormRepo dormRepo) {
		this.dormRepo = dormRepo;
	}
	
	public List<Dorm> allDorms(){
		return dormRepo.findAll();
	}
	
	public Dorm findDorm(String dormName) {
		return dormRepo.findByName(dormName);
	}
	
	public Optional<Dorm> findDormById(Long id) {
		return dormRepo.findById(id);
	}
	
	public Dorm createOrUpdateDorm(Dorm d) {
		return dormRepo.save(d);
	}
	
	public void removeDorm(Long id) {
		dormRepo.deleteById(id);
	}
}
