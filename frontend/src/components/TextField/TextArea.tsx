import React from "react";
import { ErrorMessage, useField } from "formik";

interface TextAreaProps {
	label: string;
	name: string;
	type: string;
	rows?: number;
}

const TextArea: React.FC<TextAreaProps> = ({ label, ...props }) => {
	const [field, meta] = useField(props);
	return (
		<div className='mb-2'>
			<label htmlFor={field.name}>{label}</label>
			<textarea
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

export default TextArea;
