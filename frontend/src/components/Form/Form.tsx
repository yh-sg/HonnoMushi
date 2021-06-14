import React from "react";
import RegisterForm from "../RegisterForm/RegisterForm";
import RegisterFormSuccess from "../RegisterFormSuccess/RegisterFormSuccess";

const Form = () => {
	const [formIsSubmitted, setFormIsSubmitted] = React.useState(false);

	return (
		<div>{!formIsSubmitted ? <RegisterForm /> : <RegisterFormSuccess />}</div>
	);
};

export default Form;
