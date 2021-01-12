package com.mb.studentroster.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.mb.studentroster.models.Contactinfo;
import com.mb.studentroster.services.ContactinfoServices;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class ContactinfoApi {
	private final ContactinfoServices cs;
	
	public ContactinfoApi(ContactinfoServices cs) {
		this.cs = cs;
	}
	
	@RequestMapping("/api/students/{studentId}/contactinfo")
	public Contactinfo findByStudetnId(@PathVariable("studentId") Long studentId) {
		return cs.findByStudent(studentId);
	}
	
	@RequestMapping("/api/contactinfos/{id}/")
	public Contactinfo findContactinfoWithId(@PathVariable("id") Long id) {
		return cs.findContactinfoWithId(id);
	}
	
	@RequestMapping(value="/api/contactinfos/{contactinfoId}", method=RequestMethod.PATCH)
	public Contactinfo updateContactinfo(@PathVariable("contactinfoId") Long contactinfoId, @RequestBody Contactinfo contactinfo) {
		
		cs.createOrUpdateContactinfo(contactinfo);
		
		return cs.findContactinfoWithId(contactinfoId);
	}
}
