interface RegisterValues {
	username: string;
	email: string;
	password: string;
}

const validation = (values: RegisterValues) => {
	let errors: any = {};

	if (!values.username) {
		errors.username = "Username is required";
	}

	if (!values.email) {
		errors.email = "Email is required";
	} else if (!/\S+@\S+\.\S+/.test(values.email)) {
		errors.email = "Email is invalid";
	}

	if (!values.password) {
		errors.password = "Password is required";
	} else if (values.password.length < 5 || values.password.length > 10) {
		errors.password = "Password must be between 5 and 10 characters";
	}

	return errors;
};

export default validation;
