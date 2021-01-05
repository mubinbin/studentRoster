package com.mb.studentroster.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mb.studentroster.models.Course;
import com.mb.studentroster.models.CourseStudent;
import com.mb.studentroster.models.Student;

@Repository
public interface CourseStudentRepo extends JpaRepository<CourseStudent, Long>{
	CourseStudent findByStudentAndCourse(Student student, Course course);
}
