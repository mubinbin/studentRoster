package com.mb.studentroster.controllers;

import java.util.Collections;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.mb.studentroster.models.Course;
import com.mb.studentroster.services.CourseServices;

@Controller
public class CourseController {
	private CourseServices cs;
	
	public CourseController(CourseServices cs) {
		this.cs = cs;
	}
	
	 @RequestMapping("/allcourses")
	 public String allCourses(Model model) {
		 System.out.println("here");
		 List<Course> courses = cs.allCourses();
	     Collections.sort(courses);
	     model.addAttribute("courses", courses);
	     return "/courses/allCourses.jsp";
	 }
	 
}
