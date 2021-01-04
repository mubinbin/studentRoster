<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html>
<head>
	<meta charset="ISO-8859-1">
	<title>All Classes</title>
</head>
<body>
	<p><a href="/">All Students</a> | <a href="/alldorms">All Dormities</a> | <a href="/allcourses">All Classes</a></p>

	<h1>All Classes</h1>

	<p><a href="/courses/new">Add a New Class</a></p>

	<table>
		<thead>
			<tr>
				<th>Name</th>
				<th>Action</th>
				<th>Total Students</th>
			</tr>
		</thead>

		<tbody>
			<c:forEach var="course" items="${courses}">
				<tr>
					<td><a href="/courses/${course.id}"><c:out value="${ course.name }"/></a></td>
					<td><a href="/courses/delete/${course.id}">Delete</a></td>
					<td><c:out value="${ course.students.size() }"/></td>
				</tr>
			</c:forEach>
		</tbody>
	</table>
</body>
</html>