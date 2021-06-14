import React from "react";
import { useHistory } from "react-router-dom";
import validation from "./Validation";
import { FormContainer } from "./RegisterForm.style";

const Login: React.FC = () => {
	const history = useHistory();

	const [values, setValues] = React.useState({
		username: "",
		email: "",
		password: "",
	});

	const [errors, setErrors] = React.useState<any>({});

	const handleChange = (event: React.FormEvent<HTMLInputElement>): void => {
		setValues({
			...values,
			[event.currentTarget.name]: event.currentTarget.value,
		});
	};

	const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>): void => {
		event.preventDefault();
		setErrors(validation(values));
		setValues({
			username: "",
			email: "",
			password: "",
		});
		// if no errors then push
		// history.push({ pathname: "/registersuccess" });
	};

	return (
		<FormContainer>
			<h3>Create Account</h3>
			<form>
				<div className='username'>
					<label>Username</label>
					<input
						type='text'
						placeholder='e.g. Amir Ahmad'
						name='username'
						onChange={handleChange}
						value={values.username}
					/>
					{errors.username && <p>{errors.username}</p>}
				</div>

				<div className='email'>
					<label>Email</label>
					<input
						type='email'
						placeholder='e.g. aa123@gmail.com'
						name='email'
						onChange={handleChange}
						value={values.email}
					/>
					{errors.email && <p>{errors.email}</p>}
				</div>
				<div className='password'>
					<label>Password</label>
					<input
						type='password'
						placeholder='e.g. ******'
						name='password'
						onChange={handleChange}
						value={values.password}
					/>
					{errors.password && <p>{errors.password}</p>}
				</div>
				<button onClick={handleSubmit}>Register</button>
			</form>
		</FormContainer>
	);
};

export default Login;
