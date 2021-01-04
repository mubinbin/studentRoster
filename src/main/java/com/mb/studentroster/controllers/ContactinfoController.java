package com.mb.studentroster.controllers;

import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.mb.studentroster.models.Contactinfo;
import com.mb.studentroster.models.Student;
import com.mb.studentroster.services.ContactinfoServices;
import com.mb.studentroster.services.StudentServices;

@Controller
public class ContactinfoController {
	private final ContactinfoServices cis;
	private final StudentServices ss;
	
	public ContactinfoController(ContactinfoServices cis, StudentServices ss) {
		this.cis = cis;
		this.ss = ss;
	}
	
	@RequestMapping("/students/{id}/contactinfo/new")
	public String newContactinfo(@ModelAttribute("contactinfo") Contactinfo contactinfo, @PathVariable("id") Long id, HttpSession session){
		Student curStudent = ss.findStudent(id);
		session.setAttribute("curStudent", curStudent);
		return "/students/addContactinfo.jsp";
	}

	@RequestMapping(value="/contactinfo", method=RequestMethod.POST)
	public String addNewContactinfo(@Valid @ModelAttribute("contactinfo") Contactinfo contactinfo, BindingResult result){
		
		if(result.hasErrors()) return "/students/addContactinfo.jsp";
		cis.createOrUpdateContactinfo(contactinfo);

		return "redirect:/students/" + contactinfo.getStudent().getId();
	}
	
}
