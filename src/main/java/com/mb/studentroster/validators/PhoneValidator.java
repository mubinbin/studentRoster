package com.mb.studentroster.validators;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import javax.validation.Constraint;
import javax.validation.Payload;


// customized phone number validator
@Documented
@Target( {ElementType.METHOD, ElementType.FIELD} )
@Retention(RetentionPolicy.RUNTIME)

						// which class will process this validator
@Constraint(validatedBy = PhoneValidatorValidation.class)
public @interface PhoneValidator {
	String message() default "Invalid phone number format!";
	Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
