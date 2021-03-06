<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
    
<!DOCTYPE html>
<html>
<head>
	<meta charset="ISO-8859-1">
	<title>All Dormities</title>
</head>
<body>
	<p><a href="/">All Students</a> | <a href="/alldorms">All Dormities</a> | <a href="/allcourses">All Classes</a></p>
	
	<h1>All Dormities</h1>

	<p><a href="/dorms/new">Add a New Dormity</a></p>

	<table>
		<thead>
			<tr>
				<th>Name</th>
				<th>Address</th>
				<th>Action</th>
				<th>Total Students</th>
			</tr>
		</thead>

		<tbody>
			<c:forEach var="dorm" items="${dorms}">
				<tr>
					<td><a href="/dorms/${dorm.id}"><c:out value="${ dorm.name }"/></a></td>
					<td><c:out value="${ dorm.address }"/></td>
					<td><a href="/dorms/delete/${dorm.id}">Delete</a></td>
					<td><c:out value="${ dorm.students.size() }"/></td>
				</tr>
			</c:forEach>
		</tbody>
	</table>
</body>
</html>