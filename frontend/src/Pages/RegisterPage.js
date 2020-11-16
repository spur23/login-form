import React, { useState, useContext, useEffect } from "react";
import ErrorMessage from "../Components/ErrorMessage";
import Form from "../Components/Form";
import { StoreContext } from "../context/store";
import styled from "styled-components";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCheck,
	faTimes,
	faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import {
	checkPassword,
	passwordCapitalLetterQuantity,
	passwordCharacterQuantity,
	passwordNumberQuantitiy,
	passwordSpecialCharacterQuantity,
} from "../utils/PasswordVerification";
import { checkError } from "../utils/RegisterFormErrorCheck";

const Container = styled.div`
	display: flex;
	flex-direction: column;
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

	& .register-error {
		margin-top: 5rem;
	}
`;

const FormContainer = styled.div`
	display: flex;
	flex-direction: row;
`;

const RegisterPage = ({ location, history }) => {
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
	const [error, setError] = useState("");

	const [state, dispatch] = useContext(StoreContext);

	useEffect(() => {
		dispatch({ type: "update_user" });
	}, [dispatch]);

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

	const submitHandler = async (event) => {
		event.preventDefault();
		if (register.nameFirst.length <= 3) {
			setError("First Name is required.");
			return;
		} else if (register.nameLast <= 3) {
			setError("Last Name is required.");
			return;
		} else if (register.email === "") {
			setError("Email is required.");
			return;
		} else if (register.password === "" || register.password === "") {
			setError("Password is required.");
			return;
		} else if (!passwordCheck.length) {
			setError(
				`Password must be at least ${passwordCharacterQuantity} characters.`
			);
			return;
		} else if (!passwordCheck.numbers) {
			setError(
				`Password must contain at least ${passwordNumberQuantitiy} numbers.`
			);
			return;
		} else if (!passwordCheck.capitalLetters) {
			setError(
				`Password must contain at least ${passwordCapitalLetterQuantity} capital letter.`
			);
			return;
		} else if (!passwordCheck.characters) {
			setError(
				`Password must contain at least ${passwordSpecialCharacterQuantity} special characters.`
			);
			return;
		}

		try {
			const { data } = await axios.post(
				"/api/register",
				{
					nameFirst: register.nameFirst,
					nameLast: register.nameLast,
					email: register.email,
					password: register.password,
				},
				{ headers: { "Content-Type": "application/json" } }
			);
		} catch (error) {
			const {
				response: {
					data: { message },
				},
			} = error;
			setError(message);
			console.log(message);
		}
	};

	const formObject = [
		{
			type: "text",
			name: "nameFirst",
			label: "First Name",
			defaultValue: "First Name",
			onChange: handleChange,
			value: register.name,
			errorMessage: errorMessage.nameFirst,
		},
		{
			type: "text",
			name: "nameLast",
			label: "Last Name",
			defaultValue: "Last Name",
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
			<div style={{ display: "flex", flexDirection: "column" }}>
				<div
					style={{
						height: "3rem",
						alignSelf: "center",
					}}
				>
					{error === "" ? null : (
						<ErrorMessage>
							<FontAwesomeIcon
								icon={faExclamationTriangle}
								color='red'
							/>{" "}
							{error}
						</ErrorMessage>
					)}
				</div>
				<FormContainer>
					<Form
						obj={formObject}
						title='Register'
						onSubmit={submitHandler}
					/>
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
							{`Be at least ${passwordCharacterQuantity} characters`}
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
							{`Contain ${passwordCapitalLetterQuantity} capital letters`}
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
							{`Contain at least ${passwordNumberQuantitiy} numbers`}
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
							{`Contain at least ${passwordSpecialCharacterQuantity} of the following @!#$%+/=~`}
						</p>
					</div>
				</FormContainer>
			</div>
		</Container>
	);
};

export default RegisterPage;
