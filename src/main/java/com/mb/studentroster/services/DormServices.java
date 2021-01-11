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
	
	public Dorm findDorm(Long id) {
		Optional<Dorm> optionalDorm = dormRepo.findById(id);
		return optionalDorm.isPresent()? optionalDorm.get() : null;
	}
	
	public Dorm createOrUpdateDorm(Dorm d) {
		return dormRepo.save(d);
	}
	
	public void removeDorm(Long id) {
		dormRepo.deleteById(id);
	}
}
