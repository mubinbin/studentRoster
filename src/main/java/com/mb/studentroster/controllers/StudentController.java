package com.mb.studentroster.controllers;


import java.util.List;

import javax.validation.Valid;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.mb.studentroster.models.Contactinfo;
import com.mb.studentroster.models.Dorm;
import com.mb.studentroster.models.Student;
import com.mb.studentroster.services.ContactinfoServices;
import com.mb.studentroster.services.CourseServices;
import com.mb.studentroster.services.DormServices;
import com.mb.studentroster.services.StudentServices;

@Controller
public class StudentController {
	
	private final StudentServices ss;
	private final DormServices ds;
	private final CourseServices cs;
	private final ContactinfoServices cis;
	
	public StudentController(ContactinfoServices cis, StudentServices ss, DormServices ds, CourseServices cs) {
		this.ss = ss;
		this.ds = ds;
		this.cs = cs;
		this.cis = cis;
	}
	
	@RequestMapping("/students/new")
	public String newStudent(@ModelAttribute("student") Student student, Model model) {
		List<Dorm> dorms = ds.allDorms();
		model.addAttribute("dorms", dorms);
		
		return "/students/addStudent.jsp";
	}
	
	@RequestMapping(value="/students", method=RequestMethod.POST)
	public String addNewStudent(@Valid @ModelAttribute("student") Student student, BindingResult result) {
		if(result.hasErrors()) return "/students/addStudent.jsp";
		
		ss.createOrUpdateStudent(student);
		return "redirect:/students/" + student.getId();
	}
	
	@RequestMapping("/")
	public String allStudents(Model model) {
		List<Student> students = ss.allStudents();
		model.addAttribute("students", students);
		return "/students/allStudents.jsp";	
	}
	
	@RequestMapping("/students/{id}")
	public String studentDetails(@PathVariable("id") Long id, Model model) {
		
		Student curStudent = ss.findStudent(id);
		model.addAttribute("curStudent", curStudent);
		return "/students/studentDetails.jsp";
	}
	
	
}
