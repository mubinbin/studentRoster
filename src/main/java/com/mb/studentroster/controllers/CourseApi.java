package com.mb.studentroster.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
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
	
	@RequestMapping("/api/courses")
	public List<Course> allCourses(){
		return cs.allCourses();
	}
	
	@RequestMapping("/api/courses/students/{studentId}")
	public List<Course> coursesStudentCanEnroll(@PathVariable("studentId") Long studentId){
		
		Student curStudent = ss.findStudent(studentId);
		ArrayList<Course> availableCourses = new ArrayList<Course>();
		List<Course> allCourses = cs.allCourses();
		
		for(Course c : allCourses) {
			if(!curStudent.getCourses().contains(c)) {
				availableCourses.add(c);
			}
		}
		return availableCourses;
	}
	
	@RequestMapping("/api/courses/{id}")
	public Course findCourseById(@PathVariable("id") Long id) {
		return cs.findCourseWithId(id);
	}
	
	@RequestMapping(value="/api/courses/removestudent/{studentId}/{courseId}", method=RequestMethod.DELETE)
	public Course dropCourse(@PathVariable("studentId") Long studentId, @PathVariable("courseId") Long courseId) {
			
		Student theStudent = ss.findStudent(studentId);
		Course theCourse = cs.findCourseWithId(courseId);
			
		css.removeByStudentAndCourse(theStudent, theCourse);
		return theCourse;
	}

	@RequestMapping(value="/api/courses/addstudent/{studentId}", method=RequestMethod.PATCH)
	public List<List<Course>> addCoursesToStudent(@PathVariable("studentId") Long studentId, @RequestBody List<Long> selectedCourses){

		Student theStudent = ss.findStudent(studentId);
		
		for (Long courseId : selectedCourses) {
			Course courseToEnroll = cs.findCourseWithId(courseId);
			css.newCourseStudent(theStudent, courseToEnroll);
		}

		ArrayList<List<Course>> ans = new ArrayList<List<Course>>();
		ans.add(theStudent.getCourses());
		ans.add(this.coursesStudentCanEnroll(studentId));

		return ans;
	}
}