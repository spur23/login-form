import React from "react";
import InputField from "./InputField";
import styled from "styled-components";

const StyledForm = styled.form`
	display: flex;
	flex-direction: column;
	width: 25vw;
	margin: 5rem auto;
	padding: 1.5rem;

	& button {
		padding: 10px 15px;
		margin-top: 1rem;
		border-radius: 4px;
		border: none;
		box-shadow: 0 0 4px #ecf0f1;
		width: 150px;
		background: #2980b9;
		color: #fff;
		cursor: pointer;
		align-self: flex-end;
	}

	& input {
		padding: 0.5rem;
		border: none;
		border-bottom: 1px solid #777;
		background-color: #ecf0f1;
		outline: none;
		font-size: 1.1rem;
		box-sizing: border-box;
		margin: 0.5em 0 0.5em 0;
	}
`;

const Error = styled.span`
	color: #d63031;
	background-color: #fab1a0;
	border: 1px solid #e17055;
	border-radius: 3px;
`;

const Form = ({ obj, title, onSubmit }) => {
	return (
		<StyledForm>
			<h1>{title}</h1>
			{obj.map((el) => (
				<React.Fragment key={`div-${el.name}`}>
					<InputField
						type={el.type}
						name={el.name}
						value={el.value}
						label={el.label}
						onChange={el.onChange}
						key={`Input-${el.name}`}
					/>
					{el.errorMessage === "" ? null : (
						<Error key={`${el.name}error`}>{el.errorMessage}</Error>
					)}
				</React.Fragment>
			))}
			<button type='submit' onClick={onSubmit}>
				Submit
			</button>
		</StyledForm>
	);
};

export default Form;
