package com.mb.studentroster.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.mb.studentroster.models.Student;
import com.mb.studentroster.services.StudentServices;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class StudentApi {
    private final StudentServices ss;

    public StudentApi(StudentServices ss) {
        this.ss = ss;
    }

    @RequestMapping("/api/students")
    public List<Student> allStudents() {
        return ss.allStudents();
    }

    @RequestMapping("/api/students/{id}")
    public Student oneStudent(@PathVariable("id") Long id) {

        return ss.findStudent(id);
    }

    @RequestMapping(value = "/api/students/new", method = RequestMethod.POST)
    public Student newStudent(@RequestBody Student student) {
    	
        return ss.createOrUpdateStudent(student);
    }

    @RequestMapping(value = "/api/students/edit/{id}", method = RequestMethod.PATCH)
    public Student editStudent(@PathVariable("id") Long id, @RequestBody Student student) {
        Student studentToChange = ss.findStudent(id);
        
        studentToChange.setAge(student.getAge());
        studentToChange.setFirstName(student.getFirstName());
        studentToChange.setLastName(student.getLastName());
    	
    	ss.createOrUpdateStudent(studentToChange);
        return studentToChange;
    }
}
