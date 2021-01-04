package com.mb.studentroster.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.mb.studentroster.models.Course;
import com.mb.studentroster.repositories.CourseRepo;

@Service
public class CourseServices {
	
	private final CourseRepo courseRepo;
	
	public CourseServices(CourseRepo courseRepo) {
		this.courseRepo = courseRepo;
	}
	
	public List<Course> allCourses(){
		return courseRepo.findAll();
	}
	
	public Course findCourseWithName(String name) {
		Course course = courseRepo.findByName(name);
		return course;
	}
	
	public Course findCourseWithId(Long id){
		Optional<Course> optionalCourse = courseRepo.findById(id);
		return optionalCourse.isPresent()? optionalCourse.get() : null;
	}
	
	public Course createOrUpdateCourse(Course c) {
		return courseRepo.save(c);
	}
	
	public void removeCourse(Long id) {
		courseRepo.deleteById(id);
	}
}
