package com.mb.studentroster.controllers;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.times;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mb.studentroster.models.Student;
import com.mb.studentroster.services.CourseServices;
import com.mb.studentroster.services.CourseStudentServices;
import com.mb.studentroster.services.DormServices;
import com.mb.studentroster.services.StudentServices;

// need to use Mockito
// if using @SpringBootTest, no need to use Mockito
// WebMvcTest is for web layer testing
@WebMvcTest(StudentApi.class)
class StudentApiTest {
	
	@Autowired
	private MockMvc mockMvc;
	
	@Autowired
	ObjectMapper objectMapper;
	
	@MockBean
	private StudentServices studentServices;
	@MockBean
    private DormServices ds;
	@MockBean
    private CourseServices cs;
	@MockBean
    private CourseStudentServices css;

	// api for get all
	@Test
	void testGetAllStudents() {
		
		List<Student> allStudents = new ArrayList<Student>();
		allStudents.add(new Student("Binbin","Mu",18));
		allStudents.add(new Student("Eric","Dong",20));
		allStudents.add(new Student("Tony","Kim",23));
		allStudents.add(new Student("Audi","Harika",21));
		
		Mockito.when(studentServices.allStudents()).thenReturn(allStudents);
	
		String url = "/api/students";
		
		try {
			
			MvcResult res = mockMvc.perform(get(url)).andExpect(status().isOk()).andReturn();
			
			String actualJsonRes = res.getResponse().getContentAsString();
//			System.out.println("Actual Res is: " + actualJsonRes);
			
			String expectedJsonRes = objectMapper.writeValueAsString(allStudents);
//			System.out.println("Expected Res is: " + expectedJsonRes);
			
			assertThat(actualJsonRes).isEqualToIgnoringWhitespace(expectedJsonRes);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	// api for get one
	@Test
	public void testGetOneStudent() {
		
		long Id = 2;
		
		Student binbinMu = new Student();
		binbinMu.setFirstName("Binbin");
		binbinMu.setLastName("Mu");
		binbinMu.setAge(34);
		
		Mockito.when(studentServices.findStudent(Id)).thenReturn(binbinMu);
		
		String url = "/api/students/" + Id;
		
		try {
			MvcResult res = mockMvc.perform(get(url)).andExpect(status().isOk()).andReturn();
			// this should return binbin
			String actualJsonMu = res.getResponse().getContentAsString();
			// this should return albee
			String expectedJsonMu = objectMapper.writeValueAsString(binbinMu);
			
			assertEquals(actualJsonMu, expectedJsonMu);
		}catch(Exception e) {
			e.printStackTrace();
		}
	}
	
	// api for create
	@Test
	public void testCreateNewStudent() {
		Student s = new Student("Binbin", "Mu", 18);
		s.setId((long) 1);
		
		
		// need to use Mockito.any(Student.class) instead of a instance of Student class
		Mockito.when(studentServices.createOrUpdateStudent(Mockito.any(Student.class))).thenReturn(s);
		
		String url = "/api/students/new";
		
		try {
			String expected = objectMapper.writeValueAsString(s);
			MvcResult res = mockMvc.perform(post(url)
					.contentType(MediaType.APPLICATION_JSON)
					.content(objectMapper.writeValueAsString(s))
					.accept(MediaType.APPLICATION_JSON)
					.with(csrf()))
			.andDo(print())
			.andExpect(status().isOk())
			.andExpect(content().contentType("application/json"))
			.andReturn();
			
			String actual = res.getResponse().getContentAsString();

			assertEquals(expected, actual);
		}catch(Exception e) {
			e.printStackTrace();
		}
	}
	
	// api for delete
	@Test
	public void testDeleteStudent() {
		long Id = 111;
		
		Mockito.doNothing().when(studentServices).removeStudent(Id);
		
		String url = "/api/students/" + Id;
		
		try {
			mockMvc
				.perform(delete(url))
			    .andDo(print())
				.andExpect(status().isOk());
			
			// see if the delete method was called one time
			Mockito.verify(studentServices, times(1)).removeStudent(Id);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
