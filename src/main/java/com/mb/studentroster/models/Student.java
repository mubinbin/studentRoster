package com.mb.studentroster.models;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.springframework.format.annotation.DateTimeFormat;

@Entity
@Table(name="students")
public class Student implements Comparable<Student>{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Size(min = 2, max=200, message="First Name must be bewteen {2} and {1} characters!")
	private String firstName;
	@Size(min = 2, max=200, message="Last Name must be bewteen {2} and {1} characters!")
	private String lastName;

	private Integer age;
	
	@Column(updatable=false)
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date createdAt;
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date updatedAt;
	
	@OneToOne(mappedBy = "student", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private Contactinfo contactinfo;
	
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="dorm_id", nullable=true)
	private Dorm dorm;
	
	@ManyToMany(fetch=FetchType.LAZY)
	@JoinTable(
		// name for the many to many join table
		name="`courses_students`",
		// joinColumns for this class itselft, whereras inverseJoinColumns for the other class
		joinColumns = @JoinColumn(name="student_id"),
		inverseJoinColumns = @JoinColumn(name="`course_id`")	
	)
	private List<Course> courses;
	
	public Student() {
	}
	
	public Student(Dorm dorm) {
		this.dorm = dorm;
	}

	public Student(String firstName, String lastName, Integer age) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.age = age;
	}
	
	public Student(String firstName, String lastName, Integer age, Dorm dorm) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.age = age;
		this.dorm = dorm;
	}
	
	@Override
	public int compareTo(Student s) {
		return this.getFirstName().compareTo(s.getFirstName());
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public Integer getAge() {
		return age;
	}

	public void setAge(Integer age) {
		this.age = age;
	}

	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	public Date getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(Date updatedAt) {
		this.updatedAt = updatedAt;
	}

	public Contactinfo getContactinfo() {
		return contactinfo;
	}

	public void setContactinfo(Contactinfo contactinfo) {
		this.contactinfo = contactinfo;
	}
	
	public void setDorm(Dorm dorm) {
		this.dorm = dorm;
	}
	
	public Dorm getDorm() {
		return dorm;
	}
	
	public List<Course> getCourses() {
		return courses;
	}
	
	public void setCourses(List<Course> courses) {
		this.courses = courses;
	}
}
