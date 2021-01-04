package com.mb.studentroster.controllers;


import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.mb.studentroster.models.Dorm;
import com.mb.studentroster.models.Student;
import com.mb.studentroster.services.DormServices;
import com.mb.studentroster.services.StudentServices;

@Controller
public class DormController {
    private final DormServices ds;
    private final StudentServices ss;

    public DormController(DormServices ds, StudentServices ss) {
        this.ds = ds;
        this.ss = ss;
    }

    @RequestMapping("/alldorms")
    public String allDorms(Model model) {
        List<Dorm> dorms = ds.allDorms();
        Collections.sort(dorms);
        model.addAttribute("dorms", dorms);
        return "/dorms/allDorms.jsp";
    }

    @RequestMapping("/dorms/new")
    public String newDorm(@ModelAttribute("dorm") Dorm dorm, HttpSession session) {
        List<Student> allStudents = ss.allStudents();
        ArrayList<Student> studentsDontHaveDorm = new ArrayList<Student>();
        for(Student s : allStudents) {
        	if(s.getDorm() == null) {
        		studentsDontHaveDorm.add(s);
        	}
        }
        
        session.setAttribute("studentsDontHaveDorm", studentsDontHaveDorm);
        return "/dorms/addDorm.jsp";
    }
    
    @RequestMapping(value="/dorms", method=RequestMethod.POST)
    public String addNewDorm(@Valid @ModelAttribute("dorm") Dorm dorm, BindingResult result) {
    	if(result.hasErrors()) return "/dorms/addDorm.jsp";
    	
    	ds.createOrUpdateDorm(dorm);
    	for(Student s : dorm.getStudents()) {
    		s.setDorm(dorm);
    		ss.createOrUpdateStudent(s);
    	}
    	

    	return "redirect:/dorms/" + dorm.getId();
    }

    @RequestMapping(value="/dorms/delete/{id}")
    public String removeDorm(@PathVariable("id") Long id) {
    	Dorm dormToRemove = ds.findDormById(id).get();
    	for(Student s : dormToRemove.getStudents()) {
    		s.setDorm(null);
    		ss.createOrUpdateStudent(s);
    	}
    	ds.removeDorm(id);
    	return "redirect:/alldorms";
    }
    
    @RequestMapping("/dorms/{id}")
    public String dormDetails(@ModelAttribute("dorm") Dorm dorm, @PathVariable("id") Long id, Model model) {
    	Dorm curDorm = ds.findDormById(id).get();
    	
    	List<Student> allStudents = ss.allStudents();
    	ArrayList<Student> studentsDontHaveDorm = new ArrayList<Student>();
    	for(Student s : allStudents) {
        	if(s.getDorm() == null) {
        		studentsDontHaveDorm.add(s);
        	}
        }
        
        model.addAttribute("studentsDontHaveDorm", studentsDontHaveDorm);
    	model.addAttribute("curDorm", curDorm);
    	
    	return "/dorms/dormDetails.jsp";
    }
    
    @RequestMapping(value="/dorms/addstudents/{id}", method=RequestMethod.POST)
    public String addStudentsToDorm(@Valid @ModelAttribute("dorm") Dorm dorm, @PathVariable("id") Long id) {
    	if(dorm.getStudents() == null) return "/dorms/" + id;
    	
    	Dorm theDorm = ds.findDormById(id).get();
    	
    	for(Student s : dorm.getStudents()) {
    		s.setDorm(theDorm);
    		ss.createOrUpdateStudent(s);
    	}
    	return "redirect:/dorms/" + id;
    }
    
}
