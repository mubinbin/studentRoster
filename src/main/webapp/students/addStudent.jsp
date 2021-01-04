<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@taglib prefix="c" uri = "http://java.sun.com/jsp/jstl/core" %>
    
<!DOCTYPE html>
<html>
<head>
	<meta charset="ISO-8859-1">
	<title>New Student</title>
</head>
<body>
	<h1>New Student</h1>
	
	<p><a href="/">Home Page</a></p>
	
	<form:form action="/students" method="post" modelAttribute="student">
		<p>
			<form:label path="firstName">First Name: </form:label>
			<br/>
			<form:errors path="firstName"/>
			<br/>
			<form:input path="firstName"/>
		</p>
	
		<p>
			<form:label path="lastName">Last Name: </form:label>
			<br/>
			<form:errors path="lastName"/>
			<br/>
			<form:input path="lastName"/>
		</p>
		
		<p>
			<form:label path="age">Age: </form:label>
			<br/>
			<form:errors path="age"/>
			<br/>
			<form:input path="age"/>
		</p>
		
		<p>
			<form:label path="dorm">Select a Dorm (optional): </form:label>
			<form:select path="dorm">
				<form:options items="${ dorms }" itemValue="id" itemLabel="name" />
			</form:select>
		</p>
		
		<input type="submit" value="Add Student"/>
	</form:form>

</body>
</html>