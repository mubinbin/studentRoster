package com.mb.studentroster.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mb.studentroster.models.Course;

@Repository
public interface CourseRepo extends JpaRepository<Course, Long> {
	
	List<Course> findAll();
	Course findByName(String courseName);
}
