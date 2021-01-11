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
import com.mb.studentroster.models.Dorm;
import com.mb.studentroster.models.Student;
import com.mb.studentroster.services.ContactinfoServices;
import com.mb.studentroster.services.CourseServices;
import com.mb.studentroster.services.CourseStudentServices;
import com.mb.studentroster.services.DormServices;
import com.mb.studentroster.services.StudentServices;

@Controller
public class StudentController {
	
	private final StudentServices ss;
	private final DormServices ds;
	private final CourseServices cs;
	private final CourseStudentServices css;
	
	public StudentController(ContactinfoServices cis, StudentServices ss, DormServices ds, CourseServices cs, CourseStudentServices css) {
		this.ss = ss;
		this.ds = ds;
		this.cs = cs;
		this.css = css;
	}
	
	@RequestMapping("/students/new")
	public String newStudent(@ModelAttribute("student") Student student, HttpSession session) {
		List<Dorm> dorms = ds.allDorms();
		session.setAttribute("dorms", dorms);
		
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
		System.out.println(students);
		Collections.sort(students);
		model.addAttribute("students", students);
		return "/students/allStudents.jsp";	
	}
	
	@RequestMapping("/students/{id}")
	public String studentDetails(@ModelAttribute("student") Student student, @PathVariable("id") Long id, Model model, HttpSession session) {
		
		List<Dorm> dorms = ds.allDorms();
		model.addAttribute("dorms", dorms);
		
		Student curStudent = ss.findStudent(id);
		model.addAttribute("curStudent", curStudent);
		
		List<Course> allCourses = cs.allCourses();
		ArrayList<Course> coursesNotEnrolling = new ArrayList<Course>();
		for(Course c : allCourses) {
			if(!c.getStudents().contains(curStudent)){
				coursesNotEnrolling.add(c);
			}
		}
		session.setAttribute("coursesNotEnrolling", coursesNotEnrolling);
		
		return "/students/studentDetails.jsp";
	}
	
	@RequestMapping(value="/students/{id}/adddorm", method=RequestMethod.POST)
	public String addStudentToDorm(@Valid @ModelAttribute("student") Student student, @PathVariable("id") Long id) {
		if(student.getDorm() == null) return "/students/" + id;
		
		Student studentToChange = ss.findStudent(id);
		studentToChange.setDorm(student.getDorm());
		ss.createOrUpdateStudent(studentToChange);
		return "redirect:/students/" + id;
	}
	
	@RequestMapping("/students/{id}/removedorm")
	public String removeStudentFromDorm(@PathVariable("id") Long id) {
		Student s = ss.findStudent(id);
		Long dormId = s.getDorm().getId();
		s.setDorm(null);
		ss.createOrUpdateStudent(s);
		return "redirect:/dorms/" + dormId;
	}
	
	@RequestMapping("/students/dropcourse/{studentId}/{courseId}")
	public String dropCourse(@PathVariable("studentId") Long studentId, @PathVariable("courseId") Long courseId) {
		
		Student theStudent = ss.findStudent(studentId);
		Course theCourse = cs.findCourseWithId(courseId);
		
		css.removeByStudentAndCourse(theStudent, theCourse);
		return "redirect:/students/" + studentId;
	}
	
	 @RequestMapping(value="/students/addcourses/{id}", method=RequestMethod.POST)
	 public String addCoursesToStudent(@Valid @ModelAttribute("student") Student s, @PathVariable("id") Long id) {
		 if(s.getCourses() == null) return "/students/" + id;
		 
		 Student theStudent = ss.findStudent(id);
		 
		 List<Course> joinedCourseList = theStudent.getCourses(); 
		 joinedCourseList.addAll(s.getCourses());
		 theStudent.setCourses(joinedCourseList);;
		 
		 ss.createOrUpdateStudent(theStudent);
		 return "redirect:/students/" + id;
	 }
}
