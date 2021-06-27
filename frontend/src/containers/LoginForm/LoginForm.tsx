import React from "react";
import {useDispatch} from 'react-redux'
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import TextField from "../../components/TextField/TextField";
import { FormStyle } from "../RegisterForm/RegisterForm.style";
import { AuthDetails, LOGIN } from "../../store/Auth/AuthType";
import { NoAccountStyle } from "./LoginForm.style";
import { signin } from "../../store/Auth/AuthAction";
// import { loginThunkAction } from "../../store/Auth/AuthAction";

const LoginForm: React.FC = () => {
	const dispatch = useDispatch()
	const history = useHistory();
	const validate = Yup.object({
		email: Yup.string().email("Email is invalid").required("Email is required"),
		password: Yup.string()
			.min(5, "Password must be at least 5 characters")
			.required("Password is required"),
	});

	// const [email, setEmail] = React.useState("")
	// const [password, setPassword] = React.useState("")

	const handleSubmitLogin = (values: AuthDetails): void => {
		// dispatch(loginThunkAction(values))
		// values.email = ""
		// values.password = ""
		// setEmail("")
		// setPassword("")
		// history.push('/')
		console.log(dispatch(signin(values, history)))
}

	return (
		<>
			<FormStyle>
				<Formik
					initialValues={{
						email: "",
						password: "",
					}}
					onSubmit={(values) => {
						handleSubmitLogin(values)}
					}
					validationSchema={validate}
				>
					{(formik) => (
						<div className='container'>
							<h3 className='my-4 font-weight-bold-display-4'>
								Login your account
							</h3>
							<NoAccountStyle>
								Don't have an account?&nbsp;
								<span onClick={() => history.push(`/register`)}>
									Register now
								</span>
							</NoAccountStyle>
							<Form>
								<TextField label='Email' name='email' type='email' />
								<TextField label='Password' name='password' type='password' />
								<button className='btn btn-dark mt-4 mb-4' type='submit'>
									Login
								</button>m
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

export default LoginForm;
