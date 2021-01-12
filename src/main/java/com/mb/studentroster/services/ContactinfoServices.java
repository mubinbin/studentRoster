package com.mb.studentroster.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.mb.studentroster.models.Contactinfo;
import com.mb.studentroster.models.Student;
import com.mb.studentroster.repositories.ContactinfoRepo;
import com.mb.studentroster.repositories.StudentRepo;

@Service
public class ContactinfoServices {
	
	private final ContactinfoRepo contactinfoRepo;
	private final StudentRepo studentRepo;

	public ContactinfoServices(ContactinfoRepo contactinfoRepo, StudentRepo studentRepo) {
		this.contactinfoRepo = contactinfoRepo;
		this.studentRepo = studentRepo;
	}
	
	public List<Contactinfo> allContactinfos(){
		return contactinfoRepo.findAll();
	}
	
	public Contactinfo createOrUpdateContactinfo(Contactinfo c) {
		return contactinfoRepo.save(c);
	}
	
	public void removeContactinfo(Long id) {
		contactinfoRepo.deleteById(id);
	}
	
	public Contactinfo findContactinfoWithId(Long id){
		Optional<Contactinfo> optionalContactinfo = contactinfoRepo.findById(id);
		return optionalContactinfo.isPresent()? optionalContactinfo.get() : null;
	}
	
	public Contactinfo findByStudent(Long id) {
		Student s = studentRepo.findById(id).get();
		return contactinfoRepo.findByStudent(s);
	}
}
