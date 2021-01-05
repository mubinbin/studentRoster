<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@taglib prefix="c" uri = "http://java.sun.com/jsp/jstl/core" %>       
    
<!DOCTYPE html>
<html>
<head>
	<meta charset="ISO-8859-1">
	<title>Class Details</title>
</head>
<body>
	<p><a href="/">All Students</a> | <a href="/alldorms">All Dormities</a> | <a href="/allcourses">All Classes</a></p>
	
	<h1><c:out value="${ curCourse.name }"/></h1>
	<p><b>Description: </b></p>
	<p><c:out value="${ curCourse.description }"/></p>

	<hr/>
	<h3>Students enrolling: </h3>	
	<table>
		<thead>
			<tr>
				<th>Student Name</th>
				<th>Action</th>
			</tr>
		</thead>
		
		<tbody>
			<c:forEach var="student" items="${ curCourse.students }">
				<tr>
					<td><a href="/students/${student.id}"><c:out value="${ student.firstName } ${ student.lastName }"/></a></td>
					<td><a href="/courses/removestudent/${student.id}/${curCourse.id}">Remove Student from Class</a></td>
				</tr>
			</c:forEach>
		</tbody>
	</table>
	
	<hr/>
	<h3>Add Students to This Class: </h3>
	<form:form action="/courses/addstudents/${curCourse.id}" method="post" modelAttribute="course">
		<c:forEach var="student" items="${ studentsNotEnrolling }">
			<form:checkbox path="students" value="${student}"/> <c:out value="${ student.firstName } ${ student.lastName }"/>
			<br/>
		</c:forEach>
		<input type="submit" value="Add Students"/>
	</form:form>
</body>
</html>