package com.mb.studentroster.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mb.studentroster.models.Student;
import com.mb.studentroster.services.StudentServices;

@RestController
@CrossOrigin(origins ="http://localhost:3000")
public class StudentApi {
    private final StudentServices ss;
    
    public StudentApi(StudentServices ss) {
        this.ss = ss;
    }
    
    @RequestMapping("/api/students")
    public List<Student> allStudents(){
        return ss.allStudents();
    }
    
    @RequestMapping("/api/students/{id}")
    public Student oneStudent(@PathVariable("id") Long id) {
    	
    	return ss.findStudent(id); 
    }
}
