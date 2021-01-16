package com.mb.studentroster.services;

import org.springframework.stereotype.Service;

import com.mb.studentroster.models.Course;
import com.mb.studentroster.models.CourseStudent;
import com.mb.studentroster.models.Student;
import com.mb.studentroster.repositories.CourseStudentRepo;

@Service
public class CourseStudentServices {
	private final CourseStudentRepo courseStudentRepo;

	public CourseStudentServices(CourseStudentRepo courseStudentRepo) {
		this.courseStudentRepo = courseStudentRepo;
	}
	
	public CourseStudent findByStudentAndCourse(Student s, Course c) {
		return courseStudentRepo.findByStudentAndCourse(s, c);
	}
	
	public void removeByStudentAndCourse(Student s, Course c) {
		CourseStudent csToRemove = this.findByStudentAndCourse(s, c);
		courseStudentRepo.delete(csToRemove);
	}

	public CourseStudent newCourseStudent (Student s, Course c) {
		CourseStudent courseStudent = new CourseStudent(s,c);
		courseStudentRepo.save(courseStudent);
		return courseStudent;
	}
}
