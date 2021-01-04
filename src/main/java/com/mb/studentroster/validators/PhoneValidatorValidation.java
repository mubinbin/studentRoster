package com.mb.studentroster.validators;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;


																// annotation name, type of field or method
public class PhoneValidatorValidation implements ConstraintValidator<PhoneValidator, String> {
	@Override
	public void initialize(PhoneValidator constraintAnnotation) {
	    
	}

	@Override
	public boolean isValid(String phoneNumber, ConstraintValidatorContext context) {
		Pattern pattern = Pattern.compile("^((\\(\\d{3}\\))|\\d{3})[- .]?\\d{3}[- .]?\\d{4}$");
		Matcher matcher = pattern.matcher(phoneNumber);
		
		return matcher.matches();
	}
}


