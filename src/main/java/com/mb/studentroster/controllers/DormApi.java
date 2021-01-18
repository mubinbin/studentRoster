package com.mb.studentroster.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.mb.studentroster.models.Dorm;
import com.mb.studentroster.models.Student;
import com.mb.studentroster.services.DormServices;
import com.mb.studentroster.services.StudentServices;

@RestController
@CrossOrigin(origins="http://localhost:3000")
public class DormApi {
	private final DormServices ds;
	private final StudentServices ss;
	
	public DormApi(DormServices ds, StudentServices ss) {
		this.ds = ds;
		this.ss = ss;
	}
	
	@RequestMapping("/api/dorms")
	public List<Dorm> allDorms(){
		return ds.allDorms();
	}

	@RequestMapping("/api/dorms/{id}")
	public Dorm findDorm(@PathVariable("id") Long id) {
		return ds.findDorm(id);
	}
	
	@RequestMapping(value="/api/students/{studentId}/dorms", method=RequestMethod.PUT)
	public Dorm assignDormToStudent(@PathVariable("studentId") Long id, @RequestBody Student s) {
		Student theStudent = ss.findStudent(id);
		theStudent.setDorm(s.getDorm());
		ss.createOrUpdateStudent(theStudent);
		
		return theStudent.getDorm();
	}
	
	@RequestMapping(value="/api/dorms/new", method=RequestMethod.POST)
	public Dorm newDorm(@RequestBody Dorm dorm){
		return ds.createOrUpdateDorm(dorm);
	}

	@RequestMapping(value="/api/dorms/{id}", method=RequestMethod.PATCH)
	public Dorm eidtDorm(@PathVariable("id") Long id, @RequestBody Dorm dorm) {
		Dorm dormToChange = ds.findDorm(id);
		dormToChange.setName(dorm.getName());
		dormToChange.setAddress(dorm.getAddress());
		return dormToChange;
	}
	
	@RequestMapping(value="/api/dorms/{id}", method = RequestMethod.DELETE)
	public void deleteDorm(@PathVariable("id") Long id) {
		
		Dorm dormToRemove = ds.findDorm(id);
		
		for(Student s : dormToRemove.getStudents()) {
    		s.setDorm(null);
    		ss.createOrUpdateStudent(s);
		}
		
		ds.removeDorm(id);
	}

	@RequestMapping("/api/dorms/removestudent/{studentId}")
	public Student removeStudentFromDorm(@PathVariable("studentId") Long studentId) {
		
		Student studentRemoveFromDorm = ss.findStudent(studentId);

		studentRemoveFromDorm.setDorm(null);
		ss.createOrUpdateStudent(studentRemoveFromDorm);
		return studentRemoveFromDorm;
	}
}
