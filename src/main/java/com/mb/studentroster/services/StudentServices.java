package com.mb.studentroster.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.mb.studentroster.models.Student;
import com.mb.studentroster.repositories.StudentRepo;

@Service
public class StudentServices {
	
	private final StudentRepo studentRepo;
	
	public StudentServices(StudentRepo studentRepo) {
		this.studentRepo = studentRepo;
	}
	
	public List<Student> allStudents(){
		return studentRepo.findAll();
	}
	
	public Student findStudent(Long id) {
		Optional<Student> optionalStudent = studentRepo.findById(id);
		return optionalStudent.isPresent()? optionalStudent.get() : null;
	}
	
	public Student createOrUpdateStudent(Student student) {
		return studentRepo.save(student);
	}
	
	public void removeStudent(Long id) {
		studentRepo.deleteById(id);
	}
}
