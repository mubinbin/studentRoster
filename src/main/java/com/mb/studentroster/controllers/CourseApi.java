package com.mb.studentroster.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.mb.studentroster.models.Course;
import com.mb.studentroster.models.Student;
import com.mb.studentroster.services.CourseServices;
import com.mb.studentroster.services.CourseStudentServices;
import com.mb.studentroster.services.StudentServices;

@RestController
@CrossOrigin(origins="http://localhost:3000")
public class CourseApi {
	private final CourseServices cs;
	private final StudentServices ss;
	private final CourseStudentServices css;
	
	public CourseApi(CourseServices cs, StudentServices ss, CourseStudentServices css) {
		this.cs = cs;
		this.ss = ss;
		this.css = css;
	}
	
	@RequestMapping("/api/courses/{id}")
	public Course findCourseById(@PathVariable("id") Long id) {
		return cs.findCourseWithId(id);
	}
	
	@RequestMapping(value="/api/courses/removestudent/{studentId}/{courseId}", method=RequestMethod.DELETE)
	 public void dropCourse(@PathVariable("studentId") Long studentId, @PathVariable("courseId") Long courseId) {
			
		Student theStudent = ss.findStudent(studentId);
		Course theCourse = cs.findCourseWithId(courseId);
			
		css.removeByStudentAndCourse(theStudent, theCourse);
	 }
}
