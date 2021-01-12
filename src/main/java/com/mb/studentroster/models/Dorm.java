package com.mb.studentroster.models;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.Size;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

@Entity
@Table(name="dorms")
@JsonIdentityInfo(
		  generator = ObjectIdGenerators.PropertyGenerator.class, 
		  property = "id")
public class Dorm implements Comparable<Dorm>{

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	@Size(min=2, max=200, message="Dormity Address must be between {2} and {1} characters!")
	private String address;
	
	@Size(min=2, max =200, message="Dormity Name must be between {2} and {1} characters!")
	private String name;
	
	@Column(updatable=false)
	@DateTimeFormat(pattern="yyyy-MM-dd")
	private Date createdAt;
	@DateTimeFormat(pattern="yyyy-MM-dd")
	private Date updatedAt;
	
	@JsonIgnoreProperties("dorm")
	@OneToMany(mappedBy="dorm", fetch=FetchType.LAZY)
	private List<Student> students;
	
	public Dorm() {
	}
	
	public Dorm(List<Student> students) {
		super();
		this.students = students;
	}

	public Dorm(String address, String name) {
		this.address = address;
		this.name = name;
	}

	public Dorm(String address, String name, List<Student> students) {
		this.address = address;
		this.name = name;
		this.students = students;
	}

	@Override
	public int compareTo(Dorm d) {
		return this.getName().compareTo(d.getName());
	}
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public List<Student> getStudents() {
		return students;
	}
	
	public void setStudents(List<Student> students) {
		this.students = students;
	}
	
}
