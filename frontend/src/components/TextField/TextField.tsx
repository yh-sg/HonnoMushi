import React from "react";
import { ErrorMessage, useField } from "formik";

interface TextFieldProps {
	label: string;
	name: string;
	type: string;
}

const TextField: React.FC<TextFieldProps> = ({ label, ...props }) => {
	const [field, meta] = useField(props);
	return (
		<div className='mb-2'>
			<label htmlFor={field.name}>{label}</label>
			<input
				className={`form-control shadow-none ${
					meta.touched && meta.error && "is-invalid"
				}`}
				{...field}
				{...props}
				autoComplete='off'
			/>
			<ErrorMessage component='div' className='error' name={field.name} />
		</div>
	);
};

export default TextField;
