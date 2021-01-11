package com.mb.studentroster.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.mb.studentroster.models.Contactinfo;
import com.mb.studentroster.repositories.ContactinfoRepo;

@Service
public class ContactinfoServices {
	
	private final ContactinfoRepo contactinfoRepo;

	public ContactinfoServices(ContactinfoRepo contactinfoRepo) {
		this.contactinfoRepo = contactinfoRepo;
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
}
