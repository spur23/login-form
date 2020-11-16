import React from "react";

const InputField = (props) => {
	const { type, name, value, label, defaultValue, onChange } = props;
	return (
		<>
			<label htmlFor={name}>{label}</label>
			<input
				type={type}
				id={name}
				name={name}
				value={value}
				defaultValue={defaultValue}
				onChange={onChange}
			/>
		</>
	);
};

export default InputField;
