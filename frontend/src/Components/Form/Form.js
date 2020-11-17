import React, { useEffect } from "react";
import InputField from "../InputField";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import FormStyle from "./FormStyle";

const Form = ({ obj, title, onSubmit }) => {
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
						defaultValue={el.defaultValue}
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
			<button type='submit' onClick={onSubmit}>
				Submit
			</button>
		</FormStyle>
	);
};

export default Form;
