import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import Form from "../Components/Form";

const checkError = (type, value, password) => {
	if (type === "nameFirst" || type === "nameLast") {
		if (value.length === 0) {
			return "";
		} else if (value.length <= 2) {
			if (type === "nameFirst") {
				return "First name should contain at least 3 characters";
			} else {
				return "Last name should contain at least 3 characters";
			}
		} else {
			return "";
		}
	} else if (type === "email") {
		if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || value.length === 0) {
			return "";
		} else {
			return "Please enter a valid email address";
		}
	} else if (type === "passwordConfirm") {
		if (value === password || value.length === 0) {
			return "";
		} else {
			return "Must match password";
		}
	} else {
		return "";
	}
};

const checkPassword = (value) => {
	const passwordLength = value.length >= 8;
	const passwordContainNumber = passwordValidateNumbers(value) >= 2;
	const passwordCapitalLetters = passwordValidateCapitalLetters(value) >= 2;
	const passwordCharacters = passwordValidateCharacters(value);

	return {
		length: passwordLength,
		numbers: passwordContainNumber,
		capitalLetters: passwordCapitalLetters,
		characters: passwordCharacters,
	};
};

const passwordValidateCapitalLetters = (password) => {
	const passArray = password.split("");
	// check for capital letters, if any returns quantity
	return passArray.filter((letter) => /[A-Z]/g.test(letter)).length;
};

const passwordValidateNumbers = (password) => {
	const passArray = password.split("");
	// check if password contains numbers, if any returns quantity
	return passArray.filter((letter) => /\d/.test(letter)).length;
};

const passwordValidateCharacters = (password) => {
	const passArray = password.split("");
	// check if password contains special characters, if any returns quantity
	return passArray.filter((letter) => /[@!#$%+/=~]/.test(letter)).length;
};

const Container = styled.div`
	display: flex;
	width: 50vw;
	margin: 5rem auto;
	padding: 1.5rem;
	box-shadow: 0 0 4px rgba(0, 0, 0, 0.3);
	border-radius: 4px;

	& .password-requirements {
		height: 30vh;
		width: 40%;
		align-self: center;
		& p {
			margin: 0;
		}
		& .icon {
			width: 5%;
		}
	}
`;

const RegisterPage = () => {
	const [register, setRegister] = useState({
		nameFirst: "",
		nameLast: "",
		email: "",
		password: "",
		passwordConfirm: "",
	});
	const [errorMessage, setErrorMessage] = useState({
		nameFirst: "",
		nameLast: "",
		email: "",
		password: "",
		passwordConfirm: "",
	});

	const [passwordCheck, setPasswordCheck] = useState({
		length: false,
		numbers: false,
		capitalLetters: false,
		characters: false,
	});

	const handleChange = (e) => {
		const value = e.target.value;
		const type = e.target.name;
		const error = checkError(type, value, register.password);
		setRegister({ ...register, [type]: value });
		setErrorMessage({ ...errorMessage, [type]: error });
		if (type === "password") {
			setPasswordCheck(checkPassword(value));
		}
	};

	const submitHandler = (e) => {
		e.preventDefault();
	};

	const formObject = [
		{
			type: "text",
			name: "nameFirst",
			label: "First Name",
			onChange: handleChange,
			value: register.name,
			errorMessage: errorMessage.nameFirst,
		},
		{
			type: "text",
			name: "nameLast",
			label: "Last Name",
			onChange: handleChange,
			value: register.name,
			errorMessage: errorMessage.nameLast,
		},
		{
			type: "email",
			name: "email",
			label: "Email",
			onChange: handleChange,
			value: register.email,
			errorMessage: errorMessage.email,
		},
		{
			type: "password",
			name: "password",
			label: "Password",
			onChange: handleChange,
			value: register.password,
			errorMessage: errorMessage.password,
		},
		{
			type: "password",
			name: "passwordConfirm",
			label: "Confirm Password",
			onChange: handleChange,
			value: register.passwordConfirm,
			errorMessage: errorMessage.passwordConfirm,
		},
	];

	return (
		<Container>
			<Form obj={formObject} title='Register' onSubmit={submitHandler} />
			<div className='password-requirements'>
				<h4>Password must contain the following:</h4>
				<p>
					{passwordCheck.length ? (
						<FontAwesomeIcon
							icon={faCheck}
							color='#00b894'
							className='icon'
						/>
					) : (
						<FontAwesomeIcon
							icon={faTimes}
							color='#d63031'
							className='icon'
						/>
					)}{" "}
					Be at least 8 characters
				</p>
				<p>
					{passwordCheck.capitalLetters ? (
						<FontAwesomeIcon
							icon={faCheck}
							color='#00b894'
							className='icon'
						/>
					) : (
						<FontAwesomeIcon
							icon={faTimes}
							color='#d63031'
							className='icon'
						/>
					)}{" "}
					Contain 2 capital letters
				</p>
				<p>
					{passwordCheck.numbers ? (
						<FontAwesomeIcon
							icon={faCheck}
							color='#00b894'
							className='icon'
						/>
					) : (
						<FontAwesomeIcon
							icon={faTimes}
							color='#d63031'
							className='icon'
						/>
					)}{" "}
					Contain at least 2 numbers
				</p>
				<p>
					{passwordCheck.characters ? (
						<FontAwesomeIcon
							icon={faCheck}
							color='#00b894'
							className='icon'
						/>
					) : (
						<FontAwesomeIcon
							icon={faTimes}
							color='#d63031'
							className='icon'
						/>
					)}{" "}
					Contain at least 1 of the following @!#$%+/=~
				</p>
			</div>
		</Container>
	);
};

export default RegisterPage;
