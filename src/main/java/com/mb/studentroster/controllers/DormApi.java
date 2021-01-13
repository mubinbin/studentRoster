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
	
	@RequestMapping(value="/api/students/{studentId}/dorms", method=RequestMethod.POST)
	public Dorm assignDormToStudent(@PathVariable("studentId") Long studentId, @RequestBody Dorm d) {
		Student s = ss.findStudent(studentId);
		
		d.getStudents().add(s);
		ds.createOrUpdateDorm(d);
		s.setDorm(d);
		ss.createOrUpdateStudent(s);
		
		return s.getDorm();
	}
}
