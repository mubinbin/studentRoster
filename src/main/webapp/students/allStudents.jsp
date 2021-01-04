<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
    
<!DOCTYPE html>
<html>
<head>
	<meta charset="ISO-8859-1">
	<title>All Students</title>
</head>
<body>
	<p><a href="/">All Students</a> | <a href="/alldorms">All Dormities</a> | <a href="/allcourses">All Classes</a></p>
	
	<h1>All Students</h1>
	
	<p><a href="/students/new">Add a New Student</a></p>

	<table>
		<thead>
			<tr>
				<th>Student's Name</th>
				<th>Age</th>
				<th>Assigned a Dromity?</th>
			</tr>
		</thead>

		<tbody>
			<c:forEach var="student" items="${students}">
				<tr>
					<td><a href="/students/${student.id}"><c:out value="${ student.firstName } ${ student.lastName }"/></a></td>
					<td><c:out value="${ student.age }"/></td>
					<td><c:if test="${student.dorm == null}">No</c:if>
						<c:if test="${student.dorm != null}">Yes</c:if>
					</td>
				</tr>
			</c:forEach>
		</tbody>
	</table>
</body>
</html>