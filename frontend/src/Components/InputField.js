import React from "react";

const InputField = (props) => {
	const { type, name, value, label, placeholder, onChange } = props;
	return (
		<>
			<label htmlFor={name}>{label}</label>
			<input
				type={type}
				id={name}
				name={name}
				value={value}
				placeHolder={placeholder}
				onChange={onChange}
			/>
		</>
	);
};

export default InputField;
