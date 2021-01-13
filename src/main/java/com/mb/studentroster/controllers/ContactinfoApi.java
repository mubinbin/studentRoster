package com.mb.studentroster.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.mb.studentroster.models.Contactinfo;
import com.mb.studentroster.models.Student;
import com.mb.studentroster.services.ContactinfoServices;
import com.mb.studentroster.services.StudentServices;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class ContactinfoApi {
	private final ContactinfoServices cs;
	private final StudentServices ss;
	
	public ContactinfoApi(ContactinfoServices cs, StudentServices ss) {
		this.cs = cs;
		this.ss = ss;
	}
	
	@RequestMapping("/api/students/{studentId}/contactinfos")
	public Contactinfo findByStudetnId(@PathVariable("studentId") Long studentId) {
		return cs.findByStudent(studentId);
	}
	
	@RequestMapping("/api/contactinfos/{id}/")
	public Contactinfo findContactinfoWithId(@PathVariable("id") Long id) {
		return cs.findContactinfoWithId(id);
	}
	
	@RequestMapping(value="/api/students/{studentId}/contactinfos/{contactinfoId}", method=RequestMethod.PATCH)
	public Contactinfo updateContactinfo(@PathVariable("studentId") Long studentId, @PathVariable("contactinfoId") Long contactinfoId, @RequestBody Contactinfo contactinfo) {
		Student curStudent = ss.findStudent(studentId);
		contactinfo.setStudent(curStudent);
		cs.createOrUpdateContactinfo(contactinfo);
		
		return cs.findContactinfoWithId(contactinfoId);
	}
	
	@RequestMapping(value="/api/students/{studentId}/contactinfos", method=RequestMethod.POST)
	public Contactinfo addContactinfo(@PathVariable("studentId") Long studentId, @RequestBody Contactinfo contactinfo) {
		
		Student curStudent = ss.findStudent(studentId);
		contactinfo.setStudent(curStudent);
		cs.createOrUpdateContactinfo(contactinfo);
		
		return contactinfo;
	}
}
