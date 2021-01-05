<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>

<html>
<head>
	<meta charset="ISO-8859-1">
	<title>Dormity Details</title>
</head>
<body>
	<p><a href="/">All Students</a> | <a href="/alldorms">All Dormities</a> | <a href="/allcourses">All Classes</a></p>
	<h1><c:out value="${ curDorm.name }"/></h1>
	<p>Address: <c:out value="${ curDorm.address }"/></p>
	
	<hr/>
	<h3>Add Students to This Dorm: </h3>
	<form:form action="/dorms/addstudents/${curDorm.id}" method="post" modelAttribute="dorm">
		<c:forEach var="student" items="${ studentsDontHaveDorm }">
			<form:checkbox path="students" value="${student}"/> <c:out value="${ student.firstName } ${ student.lastName }"/>
			<br/>
		</c:forEach>

		<input type="submit" value="Add"/>
	</form:form>
	
	<hr/>
	<h3>Students in This Dorm: </h3>
	<table>
		<thead>
			<tr>
				<th>Student</th>
				<th>Action</th>
			</tr>
		</thead>
		
		<tbody>
			<c:forEach var="student" items="${ curDorm.students }">
				<tr>
					<td><c:out value="${ student.firstName } ${ student.lastName }" /></td>
					<td><a href="/students/${ student.id }/removedorm">remove</a></td>
				</tr>
			</c:forEach>
		</tbody>
	
	</table>
</body>
</html>