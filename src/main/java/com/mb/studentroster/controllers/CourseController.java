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

import com.mb.studentroster.models.Course;
import com.mb.studentroster.models.Student;
import com.mb.studentroster.services.CourseServices;
import com.mb.studentroster.services.CourseStudentServices;
import com.mb.studentroster.services.StudentServices;

@Controller
public class CourseController {
	private final CourseServices cs;
	private final StudentServices ss;
	private final CourseStudentServices css;
	
	public CourseController(CourseServices cs, StudentServices ss, CourseStudentServices css) {
		this.cs = cs;
		this.ss = ss;
		this.css = css;
	}
	
	 @RequestMapping("/allcourses")
	 public String allCourses(Model model) {
		 
		 List<Course> courses = cs.allCourses();
	     Collections.sort(courses);
	     model.addAttribute("courses", courses);
	     
	     return "/courses/allCourses.jsp";
	 }
	 
	 @RequestMapping("/courses/new")
	 public String newCourse(@ModelAttribute("course") Course course, HttpSession session) {
		 
		 List<Student> students = ss.allStudents();
		 session.setAttribute("students", students);
		 
		 return "/courses/addCourse.jsp";
	 }
	 
	 @RequestMapping(value="/courses", method=RequestMethod.POST)
	 public String addNewCourse(@Valid @ModelAttribute("course") Course course, BindingResult result) {
		 if(result.hasErrors()) return "/courses/addCourse.jsp";
		 
		 cs.createOrUpdateCourse(course);
		 return "redirect:/courses/" + course.getId();
	 }
	 
	 @RequestMapping(value="/courses/delete/{id}")
	 public String removeCourse(@PathVariable("id") Long id) {
		 cs.removeCourse(id);
		 return "redirect:/allcourses";
	 }
	 
	 @RequestMapping("/courses/{id}")
	 public String courseDetails(@ModelAttribute("course") Course course, @PathVariable("id") Long id, Model model, HttpSession session) {
		 
		 Course curCourse = cs.findCourseWithId(id);	 
		 model.addAttribute("curCourse", curCourse);
		 
		 List<Student> allStudents = ss.allStudents();
		 ArrayList<Student> studentsNotEnrolling = new ArrayList<Student>();
		 for(Student s : allStudents) {
			 if(!s.getCourses().contains(curCourse)) {
				 studentsNotEnrolling.add(s);
			 }
		 }
		 session.setAttribute("studentsNotEnrolling", studentsNotEnrolling);
		 
		 return "/courses/courseDetails.jsp";
	 }
	 
	 @RequestMapping("/courses/removestudent/{studentId}/{courseId}")
	 public String dropCourse(@PathVariable("studentId") Long studentId, @PathVariable("courseId") Long courseId) {
			
		Student theStudent = ss.findStudent(studentId);
		Course theCourse = cs.findCourseWithId(courseId);
			
		css.removeByStudentAndCourse(theStudent, theCourse);
		return "redirect:/courses/" + courseId;
	 }
	 
	 @RequestMapping(value="/courses/addstudents/{id}", method=RequestMethod.POST)
	 public String addStudentsToCourse(@Valid @ModelAttribute("course") Course c, @PathVariable("id") Long id) {
		 if(c.getStudents() == null) return "/courses/" + id;
		 
		 Course theCourse = cs.findCourseWithId(id);
		 
		 List<Student> joinedStudentList = theCourse.getStudents(); 
		 joinedStudentList.addAll(c.getStudents());
		 theCourse.setStudents(joinedStudentList);
		 
		 cs.createOrUpdateCourse(theCourse);
		 return "redirect:/courses/" + id;
	 }
	 
}
