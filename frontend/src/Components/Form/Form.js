import React, { useEffect } from "react";
import InputField from "../InputField";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import FormStyle from "./FormStyle";

const Form = ({ obj, title, onSubmit, submit, submitText }) => {
	useEffect(() => {}, [obj]);

	return (
		<FormStyle>
			<h1>{title}</h1>
			{obj.map((el) => (
				<React.Fragment key={`div-${el.name}`}>
					<InputField
						type={el.type}
						name={el.name}
						value={el.value}
						label={el.label}
						placeholder={el.defaultValue}
						onChange={el.onChange}
						key={`Input-${el.name}`}
					/>
					<div className='input-error'>
						{el.errorMessage === "" ? null : (
							<ErrorMessage key={`${el.name}error`}>
								{el.errorMessage}
							</ErrorMessage>
						)}
					</div>
				</React.Fragment>
			))}
			{submit || submit === undefined ? (
				<button type='submit' onClick={onSubmit}>
					{submitText !== undefined ? submitText : "Submit"}
				</button>
			) : null}
		</FormStyle>
	);
};

export default Form;
