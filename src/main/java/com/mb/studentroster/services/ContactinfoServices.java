package com.mb.studentroster.services;

import java.util.List;

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
}
