<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@taglib prefix="c" uri = "http://java.sun.com/jsp/jstl/core" %>    

<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Insert title here</title>
</head>
<body>
	
	<p><a href="/">All Students</a> | <a href="/alldorms">All Dormities</a> | <a href="/allcourses">All Classes</a></p>
	
	<h1>Add Class</h1>
	
	<form:form action="/courses" method="post" modelAttribute="course">
		<p>
			<form:label path="name">Class Name: </form:label>
			<br/>
			<form:errors path="name"/>
			<br/>
			<form:input path="name"/>
		</p>
		
		<p>
			<form:label path="description">Class Description: </form:label>
			<br/>
			<form:errors path="description"/>
			<br/>
			<form:textarea path="description" rows="5" cols="30"/>
		</p>
		
		<p>
			<form:label path="students">Select Students (optional): </form:label>
			<br/>
			<c:forEach var="student" items="${ students}">
				<form:checkbox path="students" value="${student}"/> <c:out value="${ student.firstName } ${ student.lastName }"/>
				<br/>
			</c:forEach>
		</p>	

		<input type="submit" value="Add Class"/>
	</form:form>
	
	
</body>
</html>