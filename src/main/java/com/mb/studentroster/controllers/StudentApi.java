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
import com.mb.studentroster.models.Dorm;
import com.mb.studentroster.models.Student;
import com.mb.studentroster.services.CourseServices;
import com.mb.studentroster.services.CourseStudentServices;
import com.mb.studentroster.services.DormServices;
import com.mb.studentroster.services.StudentServices;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class StudentApi {
    private final StudentServices ss;
    private final DormServices ds;
    private final CourseServices cs;
    private final CourseStudentServices css;

    public StudentApi(StudentServices ss, DormServices ds, CourseServices cs, CourseStudentServices css) {
        this.ss = ss;
        this.ds = ds;
        this.cs = cs;
        this.css = css;
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

    @RequestMapping(value="/api/students/{id}", method=RequestMethod.DELETE)
    public void deleteStudent(@PathVariable("id") Long id) {
        ss.removeStudent(id);
    }
    
    @RequestMapping("/api/students/nodorm")
    public List<Student> studentsNoDorm() {
    	List<Student> allStudents = ss.allStudents();
    	ArrayList<Student> studentsNoDorm = new ArrayList<Student>();
    	
    	for(Student s : allStudents) {
    		if(s.getDorm() == null) {
    			studentsNoDorm.add(s);
    		}
    	}
    	return studentsNoDorm;
    }
    
    @RequestMapping(value="/api/dorms/addstudents/{dormId}", method=RequestMethod.PATCH)
	public List<List<Student>> addStudentsToDorm(@PathVariable("dormId") Long dormId, @RequestBody List<Long> selectedStudents){

		Dorm theDorm = ds.findDorm(dormId);
		
		for (Long studentId : selectedStudents) {
			Student studentToAdd = ss.findStudent(studentId);
			studentToAdd.setDorm(theDorm);
			ss.createOrUpdateStudent(studentToAdd);
		}

		ArrayList<List<Student>> ans = new ArrayList<List<Student>>();
		ans.add(theDorm.getStudents());
		ans.add(this.studentsNoDorm());

		return ans;
	}
    
    @RequestMapping(value="/api/courses/addstudents/{courseId}", method=RequestMethod.PATCH)
	public List<List<Student>> addCoursesToStudent(@PathVariable("courseId") Long courseId, @RequestBody List<Long> selectedStudents){

		Course theCourse = cs.findCourseWithId(courseId);
		
		for (Long studentId : selectedStudents) {
			Student studentToAdd = ss.findStudent(studentId);
			css.newCourseStudent(studentToAdd, theCourse);
		}

		ArrayList<List<Student>> ans = new ArrayList<List<Student>>();
		ans.add(theCourse.getStudents());
		ans.add(this.studentsNotEnrolling(courseId));

		return ans;
	}
    
    @RequestMapping("/api/students/courses/{courseId}")
	public List<Student> studentsNotEnrolling(@PathVariable("courseId") Long courseId){
		
		Course curCourse = cs.findCourseWithId(courseId);
		
		ArrayList<Student> availableStudents = new ArrayList<Student>();
		List<Student> allStudents = ss.allStudents();
		
		for(Student s : allStudents) {
			if(!curCourse.getStudents().contains(s)) {
				availableStudents.add(s);
			}
		}
		return availableStudents;
	}
}
