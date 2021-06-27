import React from "react";
import { useDispatch } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import TextField from "../../components/TextField/TextField";
import { signupAction } from "../../store/Auth/AuthAction";
import { FormStyle, HaveAccountStyle } from "./RegisterForm.style";

interface RegisterFormProps {
	username: string;
	email: string;
	password: string;
	confirmPassword: string;
}

const RegisterForm: React.FC<RegisterFormProps> = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const validate = Yup.object({
		username: Yup.string()
			.min(5, "Usename must be at least 5 characters")
			.max(15, "Username must not be more than 15 characters")
			.required("Required"),
		email: Yup.string().email("Email is invalid").required("Email is required"),
		password: Yup.string()
			.min(5, "Password must be at least 5 characters")
			.required("Password is required"),
		confirmPassword: Yup.string()
			.oneOf([Yup.ref("password"), null], "Passwords must match")
			.required("Enter your password again"),
	});

	const handleSubmit = (values: RegisterFormProps) => {
		// console.log("register formvalues --> ", values); // can get
		dispatch(signupAction(values));
		// clear form values
		// history.push("/");
	};

	return (
		<>
			<FormStyle>
				<Formik
					initialValues={{
						username: "",
						email: "",
						password: "",
						confirmPassword: "",
					}}
					onSubmit={(values) => handleSubmit(values)}
					validationSchema={validate}
				>
					{(formik) => (
						<div className='container'>
							<h3 className='my-4 font-weight-bold-display-4'>
								Register a new account
							</h3>
							<HaveAccountStyle>
								Already have an account?{" "}
								<span onClick={() => history.push("/login")}>Login</span>
							</HaveAccountStyle>
							<Form>
								<TextField label='Username' name='username' type='text' />
								<TextField label='Email' name='email' type='email' />
								<TextField label='Password' name='password' type='password' />
								<TextField
									label='Confirm Password'
									name='confirmPassword'
									type='password'
								/>
								<button className='btn btn-dark mt-4 mb-4' type='submit'>
									Register
								</button>
								<button className='btn btn-danger mx-3 mt-4 mb-4' type='reset'>
									Reset
								</button>
							</Form>
						</div>
					)}
				</Formik>
			</FormStyle>
		</>
	);
};

export default RegisterForm;
