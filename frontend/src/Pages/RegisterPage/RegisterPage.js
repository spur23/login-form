import React, { useState, useContext, useEffect } from "react";
import ErrorMessage from "../../Components/ErrorMessage/ErrorMessage";
import Form from "../../Components/Form/Form";
import Loader from "../../Components/Loader/Loader";
import { StoreContext } from "../../context/store";
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
} from "../../utils/PasswordVerification";
import { checkError } from "../../utils/RegisterFormErrorCheck";
import { userLogin, userRegister } from "../../context/userActions";
import {
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_REGISTER_FAIL,
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
} from "../../context/constants/userConstants";
import { Container, FormContainer } from "./RegisterPageStyle";
import RegisterPageError from "../../utils/RegisterPageError";

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
	const {
		user: { loading },
	} = state;

	useEffect(() => {
		const {
			user: { userInfo },
		} = state;
		if (state.user.error) {
			setError(state.user.error);
		} else if (userInfo) {
			history.push("/profile");
		}
	}, [history, state, state.user.error]);

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

		const errorMessage = RegisterPageError(
			register,
			passwordCheck,
			passwordCharacterQuantity,
			passwordNumberQuantitiy,
			passwordCapitalLetterQuantity,
			passwordSpecialCharacterQuantity
		);

		setError(errorMessage);

		dispatch({
			type: USER_REGISTER_REQUEST,
		});

		const userInfo = await userRegister(
			register.nameFirst,
			register.nameLast,
			register.email,
			register.password
		);

		if (!userInfo.response) {
			dispatch({
				type: USER_REGISTER_SUCCESS,
			});

			dispatch({
				type: USER_LOGIN_REQUEST,
			});

			const loginInfo = await userLogin(
				register.email,
				register.password
			);

			dispatch({
				type: USER_LOGIN_SUCCESS,
				payload: loginInfo,
			});
		} else {
			dispatch({
				type: USER_REGISTER_FAIL,
				payload: userInfo.response.data.message,
			});
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
			{loading ? (
				<Loader />
			) : (
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
			)}
		</Container>
	);
};

export default RegisterPage;
