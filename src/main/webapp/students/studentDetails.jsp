<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="c" uri ="http://java.sun.com/jsp/jstl/core" %>   

<!DOCTYPE html>
<html>
<head>
	<meta charset="ISO-8859-1">
	<title>Detail Student Information</title>
</head>
<body>
	<p><a href="/">Home Page</a></p>
	
	<h1><c:out value="${ curStudent.firstName } ${ curStudent.lastName }"/></h1>
	<p>Age: <c:out value="${ curStudent.age}"/></p>
	
	<h3>Contact Information</h3>
	<c:if test="${ curStudent.contactinfo == null }">
		<p><a href="/students/${curStudent.id}/contactinfo/new">Add Contact Information</a></p>
	</c:if>
	
	<c:if test="${ curStudent.contactinfo != null }">
		<p>Home Address: <c:out value="${curStudent.contactinfo.homeAddress}"/></p>
		<p>Email: <c:out value="${curStudent.contactinfo.email}"/></p>
		<p>Phone: <c:out value="${curStudent.contactinfo.phone}"/></p>
	</c:if>

	<h3>Dormity Information</h3>
	<c:if test="${ curStudent.dorm == null }">
		<p><a href="#">Add Dormity Information</a></p>
	</c:if>
	
	<c:if test="${ curStudent.dorm != null }">
		<p>Stay at: <c:out value="${ curStudent.dorm.name}"/></p>
		<p>Address: <c:out value="${ curStudent.dorm.address}"/></p>
	</c:if>

	<h3>Enrolled Classes: </h3>
	<table>
		<thead>
			<tr>
				<th>Class Name</th>
				<th>Action</th>
			</tr>
		</thead>

		<tbody>
			<c:forEach var="course" items="${ curStudent.courses }">
				<td><a href="/courses/${course.id}"><c:out value="${ course.name }"/></a></td>
			</c:forEach>	
		</tbody>
	</table>
	
</body>
</html>