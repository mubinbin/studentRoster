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
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import org.springframework.format.annotation.DateTimeFormat;

@Entity
@Table(name="dorms")
public class Dorm {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	@Size(min=2, max=200, message="{size.address}")
	@NotBlank(message="{required.address}")
	private String address;
	
	@Size(min=2, max =200, message="{size.name}")
	@NotBlank(message="{required.name}")
	private String name;
	
	@Column(updatable=false)
	@DateTimeFormat(pattern="yyyy-MM-dd")
	private Date createdAt;
	@DateTimeFormat(pattern="yyyy-MM-dd")
	private Date updatedAt;
	
	@OneToMany(mappedBy="dorm", fetch=FetchType.LAZY)
	private List<Student> students;
	
	public Dorm() {
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

	public List<Student> getStudent() {
		return students;
	}
	
	public void setStudent(List<Student> students){
		this.students = students;
	}
	
}
