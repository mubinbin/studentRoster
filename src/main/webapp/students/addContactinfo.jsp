<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="form" uri = "http://www.springframework.org/tags/form" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %> 
    
<!DOCTYPE html>
<html>
<head>
	<meta charset="ISO-8859-1">
	<title>New Contact Information</title>
</head>
<body>
	<h3> Please enter contact information for <c:out value="${ curStudent.firstName } ${ curStudent.lastName }"/></h3>
	
	<form:form action="/contactinfo" method="post" modelAttribute="contactinfo">
		<p>
			<form:label path="homeAddress">Home Address: </form:label>
			<br/>
			<form:errors path="homeAddress"/>
			<br/>
			<form:input path="homeAddress"/>
		</p>

		<p>
			<form:label path="email">Email: </form:label>
			<br/>
			<form:errors path="email"/>
			<br/>
			<form:input path="email"/>
		</p>

		<p>
			<form:label path="phone">Phone: </form:label>
			<br/>
			<form:errors path="phone"/>
			<br/>
			<form:input path="phone"/>
		</p>
		
		<form:hidden path="student" value="${ curStudent.id }"/>

		<input type="submit" value="Add Contact Info"/>
	</form:form>
</body>
</html>